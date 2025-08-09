import { SupportedLanguage, detectLanguageFromCode, detectLanguageFromFilename } from "./language";
import { SceneSpecJsonSchema } from "./schema";
import { SYSTEM_PROMPT, USER_PROMPT_TEMPLATE } from "./prompt";

export interface BuildPayloadInput {
  filename?: string;
  code: string;
  steps: Array<{ id: string; label: string; description?: string }>;
}

export function buildAiPayload(input: BuildPayloadInput) {
  const language: SupportedLanguage = input.filename
    ? detectLanguageFromFilename(input.filename)
    : detectLanguageFromCode(input.code);

  const userPrompt = USER_PROMPT_TEMPLATE({
    language,
    code: input.code,
    steps: input.steps,
  });

  // Example of a model-agnostic payload
  return {
    system: SYSTEM_PROMPT,
    user: userPrompt,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "scene_spec_response",
        schema: SceneSpecJsonSchema,
      },
    },
  } as const;
}


