import { NextRequest, NextResponse } from "next/server";
import { submitLeadAction } from "@/app/actions/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await submitLeadAction(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Enterprise discovery intake recorded.",
        referenceId: result.referenceId,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 500 }
    );
  }
}
