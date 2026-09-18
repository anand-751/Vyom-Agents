const fs = require("fs");
const path = require("path");

const RAG_CHUNK_SIZE = 250;
const RAG_CHUNK_OVERLAP = 50;

// Embedding dimension
const EMBED_DIM = 128;

/**
 * Deterministic hash-based feature embedding with L2 normalization
 */
function computeEmbedding(text) {
  const vec = new Float64Array(EMBED_DIM);
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 1);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // 1. Single word hash
    let h1 = 0;
    for (let c = 0; c < word.length; c++) {
      h1 = ((h1 << 5) - h1 + word.charCodeAt(c)) | 0;
    }
    const idx1 = Math.abs(h1) % EMBED_DIM;
    vec[idx1] += 1.0;

    // 2. Bigram hash
    if (i < words.length - 1) {
      const bigram = word + "_" + words[i + 1];
      let h2 = 0;
      for (let c = 0; c < bigram.length; c++) {
        h2 = ((h2 << 5) - h2 + bigram.charCodeAt(c)) | 0;
      }
      const idx2 = Math.abs(h2) % EMBED_DIM;
      vec[idx2] += 1.5;
    }

    // 3. Trigram character features
    for (let c = 0; c < word.length - 2; c++) {
      const tri = word.slice(c, c + 3);
      let h3 = 0;
      for (let k = 0; k < 3; k++) {
        h3 = ((h3 << 5) - h3 + tri.charCodeAt(k)) | 0;
      }
      const idx3 = Math.abs(h3) % EMBED_DIM;
      vec[idx3] += 0.5;
    }
  }

  // L2 Normalize
  let norm = 0;
  for (let j = 0; j < EMBED_DIM; j++) {
    norm += vec[j] * vec[j];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let j = 0; j < EMBED_DIM; j++) {
      vec[j] = Number((vec[j] / norm).toFixed(5));
    }
  }

  return Array.from(vec);
}

function chunkTextSlidingWindow(text, chunkSize = RAG_CHUNK_SIZE, chunkOverlap = RAG_CHUNK_OVERLAP) {
  const words = text.trim().split(/\s+/);
  if (words.length <= chunkSize) {
    return [text.trim()];
  }
  const chunks = [];
  const stride = Math.max(1, chunkSize - chunkOverlap); // 200
  for (let i = 0; i < words.length; i += stride) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push(chunkWords.join(" "));
    if (i + chunkSize >= words.length) break;
  }
  return chunks;
}

// Source sections from company-knowledge.txt
const rawText = fs.readFileSync(path.join(__dirname, "../assets/company-knowledge.txt"), "utf8");

// Parse sections separated by dashes
const sections = rawText.split(/--------------------------------------------------------------------------------/);
const chunks = [];

let chunkCounter = 0;

for (const sec of sections) {
  const cleanSec = sec.trim();
  if (cleanSec.length < 50 || cleanSec.startsWith("===")) continue;

  const lines = cleanSec.split("\n");
  const titleLine = lines[0] || "Vyom Agents Company Overview";
  const title = titleLine.replace(/^[0-9.]+\s*/, "").trim();

  let category = "Company Overview";
  if (/voice/i.test(title)) category = "Proprietary Products";
  else if (/rpa|orchestrator/i.test(title)) category = "Proprietary Products";
  else if (/stealth|pipeline/i.test(title)) category = "R&D Pipeline";
  else if (/ecosystem|flywheel/i.test(title)) category = "Architecture & Ecosystem";
  else if (/pricing|roi/i.test(title)) category = "Pricing & Plans";
  else if (/services/i.test(title)) category = "Services";
  else if (/tech stack|mesh/i.test(title)) category = "Engineering & Tech Stack";
  else if (/security|guardrails/i.test(title)) category = "Security & Compliance";
  else if (/discovery|sla/i.test(title)) category = "Contact & Implementation";

  const windowedTexts = chunkTextSlidingWindow(cleanSec, RAG_CHUNK_SIZE, RAG_CHUNK_OVERLAP);

  windowedTexts.forEach((content, idx) => {
    chunkCounter++;
    const words = content.split(/\s+/);
    const embedding = computeEmbedding(content);

    let suggestedAction;
    if (category === "Pricing & Plans") suggestedAction = { label: "Open ROI Calculator", action: "roi" };
    else if (/voice/i.test(title)) suggestedAction = { label: "Test Live Voice Demo", action: "voice" };
    else if (/services/i.test(category)) suggestedAction = { label: "View Enterprise Services", action: "services" };
    else suggestedAction = { label: "Book Discovery Call", action: "contact" };

    chunks.push({
      id: `vyom-chunk-${chunkCounter}`,
      docTitle: title,
      category,
      chunkIndex: idx + 1,
      totalChunksInDoc: windowedTexts.length,
      wordCount: words.length,
      content,
      embedding,
      suggestedAction
    });
  });
}

const outputPath = path.join(__dirname, "../assets/company-embeddings.json");
fs.writeFileSync(outputPath, JSON.stringify({
  version: "1.0",
  generatedAt: new Date().toISOString(),
  chunkSize: RAG_CHUNK_SIZE,
  chunkOverlap: RAG_CHUNK_OVERLAP,
  embeddingDimension: EMBED_DIM,
  totalChunks: chunks.length,
  chunks
}, null, 2));

console.log(`Successfully generated ${chunks.length} vectorized chunks in ${outputPath}`);
