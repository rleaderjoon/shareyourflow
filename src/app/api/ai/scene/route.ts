import { NextRequest, NextResponse } from "next/server";
import { buildAiPayload } from "@/server/ai/payload";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename, code, steps } = body || {};
    if (typeof code !== "string" || !Array.isArray(steps)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const payload = buildAiPayload({ filename, code, steps });
    // NOTE: 실제 모델 호출은 하지 않고, 호출 직전의 페이로드만 반환
    return NextResponse.json({ payload }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}


