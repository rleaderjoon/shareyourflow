export type SupportedLanguage = "c" | "cpp" | "java" | "python" | "unknown";

export function detectLanguageFromFilename(filename?: string): SupportedLanguage {
  if (!filename) return "unknown";
  const f = filename.toLowerCase();
  if (f.endsWith(".c")) return "c";
  if (f.endsWith(".cc") || f.endsWith(".cpp") || f.endsWith(".cxx")) return "cpp";
  if (f.endsWith(".java")) return "java";
  if (f.endsWith(".py")) return "python";
  return "unknown";
}

export function detectLanguageFromCode(code: string): SupportedLanguage {
  const snippet = code.slice(0, 400).toLowerCase();
  if (/#include\s*<|printf\s*\(|scanf\s*\(/.test(snippet)) return "c";
  if (/#include\s*<.*iostream|std::|cin\s*>>|cout\s*<</.test(snippet)) return "cpp";
  if (/class\s+\w+\s*\{|public\s+static\s+void\s+main\s*\(/.test(snippet)) return "java";
  if (/def\s+\w+\s*\(|print\s*\(|import\s+/.test(snippet)) return "python";
  return "unknown";
}


