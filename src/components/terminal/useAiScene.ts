"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  const stepsKey = useMemo(() => JSON.stringify(steps), [steps]);

  const requestKey = useMemo(() => `${filename ?? 'nofile'}::${code.length}::${stepsKey}`, [filename, code.length, stepsKey]);
  const lastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    async function run() {
      // React StrictMode (dev)에서 중복 호출 방지
      if (lastKeyRef.current === requestKey) return;
      lastKeyRef.current = requestKey;
      setLoading(true);
      setError(null);
      try {
        if (process.env.NODE_ENV !== "production") {
          // debug: request preview
          // eslint-disable-next-line no-console
          console.log("[AI][scene][request]", { filename, stepsCount: steps.length, codePreview: code.slice(0, 120) });
        }
        const res = await fetch("/api/ai/scene", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename, code, steps }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (lastKeyRef.current !== requestKey) return; // 최신 요청만 반영
        if (json?.data) {
          let parsed: SceneSpecResponse | null = null;
          if (typeof json.data === "string") {
            try {
              parsed = JSON.parse(json.data) as SceneSpecResponse;
            } catch {
              parsed = null;
            }
          } else {
            parsed = json.data as SceneSpecResponse;
          }
          setData(parsed);
          setSource(json.source as "ai" | "cache");
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("[AI][scene][response]", {
              source: json.source,
              hasScenes: !!parsed?.scenes?.length,
              scenesCount: parsed?.scenes?.length ?? 0,
              firstSceneSample: parsed?.scenes?.[0] ?? null,
            });
          }
        } else if (json?.payload) {
          // 서버에 OPENAI_API_KEY가 없을 때 페이로드만 반환
          setSource("payload");
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.log("[AI][scene][dry-run]", json.payload);
          }
        } else {
          setSource(null);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("[AI][scene][error]", msg);
        }
      } finally {
        setLoading(false);
      }
    }
    run();
    return () => {
      // no-op: 최신 요청 가드로 경쟁상태 방지
    };
  }, [requestKey]);

  return { data, source, loading, error } as const;
}

export default useAiScene;


