import ts from "typescript";
import type { LuauStatement } from "../ast/luau-ast.ts";

/**
 * Extract leading comments from a TypeScript node (comments before the node).
 */
export function getLeadingComments(
  sourceFile: ts.SourceFile,
  node: ts.Node
): LuauStatement[] {
  return getCommentsFromRanges(
    sourceFile.getFullText(),
    ts.getLeadingCommentRanges(sourceFile.getFullText(), node.getFullStart())
  );
}

/**
 * Extract trailing comments from a TypeScript node (comments after the node).
 */
export function getTrailingComments(
  sourceFile: ts.SourceFile,
  node: ts.Node
): LuauStatement[] {
  return getCommentsFromRanges(
    sourceFile.getFullText(),
    ts.getTrailingCommentRanges(sourceFile.getFullText(), node.getEnd())
  );
}

function getCommentsFromRanges(
  text: string,
  ranges: readonly ts.CommentRange[] | undefined
): LuauStatement[] {
  const result: LuauStatement[] = [];
  if (!ranges) return result;
  for (const range of ranges) {
    const commentText = text.slice(range.pos, range.end).trim();
    const normalized = normalizeCommentText(commentText);
    if (normalized) {
      result.push({ type: "comment", text: normalized });
    }
  }
  return result;
}

function normalizeCommentText(raw: string): string {
  const s = raw.trim();
  if (s.startsWith("//")) {
    return s.slice(2).trim();
  }
  if (s.startsWith("/*")) {
    let content = s.slice(2);
    if (content.endsWith("*/")) {
      content = content.slice(0, -2);
    }
    // Block comments: strip leading " * " or "*" from each line (JSDoc style)
    const lines = content.split(/\r?\n/).map((line) => {
      const stripped = line.replace(/^\s*\*\s?/, "").trim();
      return stripped;
    });
    return lines.filter(Boolean).join("\n");
  }
  return s;
}
