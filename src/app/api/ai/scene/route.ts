import { NextRequest, NextResponse } from "next/server";
import { buildAiPayload } from "@/server/ai/payload";
import { callAi } from "@/server/ai/call";
import { aiSceneCache } from "@/server/ai/cache";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const dry = url.searchParams.get("dry");
    const body = await req.json();
    const { filename, code, steps } = body || {};
    if (typeof code !== "string" || !Array.isArray(steps)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const payload = buildAiPayload({ filename, code, steps });

    const stepIds: string = (steps as Array<{id: string}>).map((s) => s.id).join("-");
    const cacheKey = `${filename ?? "nofile"}:${Buffer.from(code).toString("base64").slice(0, 64)}:${stepIds}`;
    const cached = aiSceneCache.get(cacheKey);
    if (cached) {
      return NextResponse.json({ source: "cache", data: cached.value }, { status: 200 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    if (dry || !apiKey) {
      // 키가 없으면 클라이언트에서 테스트할 수 있도록 payload를 반환
      return NextResponse.json({ payload, warning: dry ? "Dry run" : "Missing OPENAI_API_KEY" }, { status: 200 });
    }

    const data = await callAi({
      provider: "openai",
      model,
      apiKey,
      system: payload.system,
      user: payload.user,
      response_format: payload.response_format,
    });
    aiSceneCache.set(cacheKey, data);
    return NextResponse.json({ source: "ai", data }, { status: 200 });
  } catch (_err) {
    const message = _err instanceof Error ? _err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}


