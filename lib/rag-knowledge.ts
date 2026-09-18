/**
 * Vyom Agents Enterprise RAG Knowledge Base & Dense Vector Embeddings Engine
 * Reads pre-computed embeddings directly from assets/company-embeddings.json
 * Configured with:
 * - Chunk Size: 250 words (~325 tokens)
 * - Chunk Overlap: 50 words (~65 tokens)
 * - Dense Vector Dimensions: 128
 * - Cosine Similarity Semantic Search
 */

import fs from "fs";
import path from "path";

export const RAG_CHUNK_SIZE = 250;
export const RAG_CHUNK_OVERLAP = 50;
export const EMBEDDING_DIMENSION = 128;

export interface VectorChunk {
  id: string;
  docTitle: string;
  category: string;
  chunkIndex: number;
  totalChunksInDoc: number;
  wordCount: number;
  content: string;
  embedding: number[];
  suggestedAction?: {
    label: string;
    action: "contact" | "voice" | "roi" | "services";
  };
}

export interface RagChunk {
  id: string;
  title: string;
  category: string;
  content: string;
  chunkIndex: number;
  totalChunks: number;
  similarityScore?: number;
  suggestedAction?: VectorChunk["suggestedAction"];
}

export interface RagEmbeddingsFile {
  version: string;
  generatedAt: string;
  chunkSize: number;
  chunkOverlap: number;
  embeddingDimension: number;
  totalChunks: number;
  chunks: VectorChunk[];
}

// In-memory cached chunks loaded from assets/company-embeddings.json
let cachedVectorChunks: VectorChunk[] = [];

/**
 * Load embeddings from assets/company-embeddings.json
 */
export function loadCompanyEmbeddings(): VectorChunk[] {
  if (cachedVectorChunks.length > 0) {
    return cachedVectorChunks;
  }

  try {
    const filePath = path.join(process.cwd(), "assets", "company-embeddings.json");
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      const parsed: RagEmbeddingsFile = JSON.parse(fileData);
      if (Array.isArray(parsed.chunks) && parsed.chunks.length > 0) {
        cachedVectorChunks = parsed.chunks;
        return cachedVectorChunks;
      }
    }
  } catch (err) {
    console.warn("Could not load assets/company-embeddings.json, falling back to static index:", err);
  }

  return cachedVectorChunks;
}

// Initialize on startup
export const VYOM_EMBEDDINGS_INDEX: VectorChunk[] = loadCompanyEmbeddings();

/**
 * Compute real-time 128-dimensional dense vector embedding for query
 * Uses same hash-based n-gram projection with L2 normalization as assets generator.
 */
export function computeQueryEmbedding(text: string): number[] {
  const vec = new Float64Array(EMBEDDING_DIMENSION);
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // 1. Single word hash
    let h1 = 0;
    for (let c = 0; c < word.length; c++) {
      h1 = ((h1 << 5) - h1 + word.charCodeAt(c)) | 0;
    }
    const idx1 = Math.abs(h1) % EMBEDDING_DIMENSION;
    vec[idx1] += 1.0;

    // 2. Bigram hash
    if (i < words.length - 1) {
      const bigram = word + "_" + words[i + 1];
      let h2 = 0;
      for (let c = 0; c < bigram.length; c++) {
        h2 = ((h2 << 5) - h2 + bigram.charCodeAt(c)) | 0;
      }
      const idx2 = Math.abs(h2) % EMBEDDING_DIMENSION;
      vec[idx2] += 1.5;
    }

    // 3. Trigram character features
    for (let c = 0; c < word.length - 2; c++) {
      const tri = word.slice(c, c + 3);
      let h3 = 0;
      for (let k = 0; k < 3; k++) {
        h3 = ((h3 << 5) - h3 + tri.charCodeAt(k)) | 0;
      }
      const idx3 = Math.abs(h3) % EMBEDDING_DIMENSION;
      vec[idx3] += 0.5;
    }
  }

  // L2 Normalize
  let norm = 0;
  for (let j = 0; j < EMBEDDING_DIMENSION; j++) {
    norm += vec[j] * vec[j];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let j = 0; j < EMBEDDING_DIMENSION; j++) {
      vec[j] = Number((vec[j] / norm).toFixed(5));
    }
  }

  return Array.from(vec);
}

/**
 * Cosine similarity between two L2-normalized vectors (dot product)
 */
export function cosineSimilarity(v1: number[], v2: number[]): number {
  if (!v1 || !v2 || v1.length !== v2.length) return 0;
  let dot = 0;
  for (let i = 0; i < v1.length; i++) {
    dot += v1[i] * v2[i];
  }
  return dot;
}

/**
 * High-speed hybrid semantic retrieval using Cosine Similarity over assets/company-embeddings.json
 */
export function retrieveRagContext(query: string, topK: number = 4): {
  chunks: {
    id: string;
    title: string;
    category: string;
    content: string;
    chunkIndex: number;
    totalChunks: number;
    similarityScore: number;
    suggestedAction?: VectorChunk["suggestedAction"];
  }[];
  combinedContext: string;
  bestAction?: VectorChunk["suggestedAction"];
  totalIndexedChunks: number;
  embeddingsSource: string;
} {
  const chunksPool = loadCompanyEmbeddings();
  const queryEmbedding = computeQueryEmbedding(query);
  const cleanQuery = query.toLowerCase().trim();
  const queryWords = cleanQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = chunksPool.map((chunk) => {
    // 1. Dense Vector Cosine Similarity (0.0 to 1.0)
    const cosSim = cosineSimilarity(queryEmbedding, chunk.embedding);

    // 2. Keyword & Title boost
    let keywordScore = 0;
    const contentLower = chunk.content.toLowerCase();
    const titleLower = chunk.docTitle.toLowerCase();

    for (const word of queryWords) {
      if (titleLower.includes(word)) keywordScore += 0.35;
      if (contentLower.includes(word)) keywordScore += 0.12;
    }

    // Combined hybrid relevance score
    const totalScore = cosSim * 0.65 + Math.min(0.5, keywordScore) * 0.35;

    return {
      chunk,
      score: totalScore,
      cosSim,
    };
  });

  scored.sort((a, b) => b.score - a.score);

  const topMatches = scored.slice(0, topK).map((s) => ({
    id: s.chunk.id,
    title: `${s.chunk.docTitle} (Part ${s.chunk.chunkIndex}/${s.chunk.totalChunksInDoc})`,
    category: s.chunk.category,
    content: s.chunk.content,
    chunkIndex: s.chunk.chunkIndex,
    totalChunks: s.chunk.totalChunksInDoc,
    similarityScore: Number(s.cosSim.toFixed(3)),
    suggestedAction: s.chunk.suggestedAction,
  }));

  const bestAction = topMatches.find((m) => m.suggestedAction)?.suggestedAction;

  const combinedContext = topMatches
    .map(
      (c) =>
        `### Source: ${c.title} [Category: ${c.category} | Vector Similarity: ${c.similarityScore}]\n${c.content}`
    )
    .join("\n\n---\n\n");

  return {
    chunks: topMatches,
    combinedContext,
    bestAction,
    totalIndexedChunks: chunksPool.length,
    embeddingsSource: "assets/company-embeddings.json",
  };
}
