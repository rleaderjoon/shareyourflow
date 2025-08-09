import { SceneSpecResponse } from "./schema";

export type ModelProvider = "openai";

export interface CallAiArgs {
  provider: ModelProvider;
  model: string;
  apiKey: string;
  system: string;
  user: string;
  text_format: unknown;
}

export async function callAi(args: CallAiArgs): Promise<SceneSpecResponse> {
  if (args.provider !== "openai") {
    throw new Error("Unsupported provider");
  }

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({
      model: args.model,
      input: [
        {
          role: "system",
          content: [
            { type: "input_text", text: args.system },
          ],
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: args.user },
          ],
        },
      ],
      text: { format: args.text_format },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI call failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  // OpenAI Responses API returns JSON object. We expect the parsed JSON in data.output[0].content[0].text
  // but response_format=json_schema should return JSON in data.output[0].content[0].json
  const json = data?.output?.[0]?.content?.[0]?.json ?? data?.output?.[0]?.content?.[0]?.text ?? data;
  return json as SceneSpecResponse;
}


