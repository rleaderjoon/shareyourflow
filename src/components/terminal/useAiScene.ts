"use client";

import { useEffect, useState } from "react";
import type { SceneSpecResponse } from "@/server/ai/schema";

export interface UseAiSceneArgs {
  filename?: string;
  code: string;
  steps: Array<{ id: string; label: string; description?: string }>;
}

export function useAiScene({ filename, code, steps }: UseAiSceneArgs) {
  const [data, setData] = useState<SceneSpecResponse | null>(null);
  const [source, setSource] = useState<"ai" | "cache" | "payload" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    async function run() {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const res = await fetch("/api/ai/scene", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename, code, steps }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (aborted) return;
        if (json?.data) {
          setData(json.data as SceneSpecResponse);
          setSource(json.source as "ai" | "cache");
        } else if (json?.payload) {
          // 서버에 OPENAI_API_KEY가 없을 때 페이로드만 반환
          setData(null);
          setSource("payload");
        } else {
          setData(null);
          setSource(null);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        if (!aborted) setError(msg);
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    run();
    return () => {
      aborted = true;
    };
  }, [filename, code, steps]);

  return { data, source, loading, error } as const;
}

export default useAiScene;


