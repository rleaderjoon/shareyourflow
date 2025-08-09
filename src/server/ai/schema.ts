export type CellState = "default" | "active" | "visited" | "result";

export interface SceneCell {
  id: string;
  position: [number, number, number];
  value: string | number | boolean | null;
  label?: string;
  state?: CellState;
}

export interface TransitionUpdate {
  id: string;
  value?: string | number | boolean | null;
  state?: CellState;
  label?: string;
}

export interface SceneTransition {
  atStepId: string; // matches a user-defined step id like 'input' | 'array' | 'dp' | 'output'
  updates: TransitionUpdate[];
}

export type SceneKind = "array1D" | "array2D" | "array3D" | "tree" | "graph" | "stack" | "queue" | "set" | "map" | "unknown";

export interface SceneSpec {
  kind: SceneKind;
  title?: string;
  dimensions: [number, number, number];
  cells: SceneCell[];
  transitions?: SceneTransition[];
}

export interface SceneSpecResponse {
  scenes: SceneSpec[]; // allow multiple scenes (e.g., input memory, working memory)
}

// JSON Schema for tool-enforced output (OpenAI/OAI style response_format)
export const SceneSpecJsonSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://shareyourflow.ai/schemas/scene-spec.json",
  type: "object",
  properties: {
    scenes: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          kind: {
            type: "string",
            enum: [
              "array1D",
              "array2D",
              "array3D",
              "tree",
              "graph",
              "stack",
              "queue",
              "set",
              "map",
              "unknown",
            ],
          },
          title: { type: "string" },
          dimensions: {
            type: "array",
            items: { type: "number" },
            minItems: 3,
            maxItems: 3,
          },
          cells: {
            type: "array",
            items: {
              type: "object",
              required: ["id", "position", "value", "label", "state"],
              properties: {
                id: { type: "string" },
                position: {
                  type: "array",
                  items: { type: "number" },
                  minItems: 3,
                  maxItems: 3,
                },
                value: {
                  type: ["string", "number", "boolean", "null"],
                },
                label: { type: "string" },
                state: {
                  type: "string",
                  enum: ["default", "active", "visited", "result"],
                },
              },
              additionalProperties: false,
            },
          },
          transitions: {
            type: "array",
            items: {
              type: "object",
              required: ["atStepId", "updates"],
              properties: {
                atStepId: { type: "string" },
                updates: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["id", "value", "state", "label"],
                    properties: {
                      id: { type: "string" },
                      value: { type: ["string", "number", "boolean", "null"] },
                      state: {
                        type: "string",
                        enum: ["default", "active", "visited", "result"],
                      },
                      label: { type: "string" },
                    },
                    additionalProperties: false,
                  },
                },
              },
              additionalProperties: false,
            },
          },
        },
        required: ["kind", "dimensions", "cells"],
        additionalProperties: false,
      },
    },
  },
  required: ["scenes"],
  additionalProperties: false,
} as const;


