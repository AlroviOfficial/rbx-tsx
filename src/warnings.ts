export type WarningCode =
  | "unsupported-element"
  | "unsupported-event"
  | "unsupported-prop"
  | "text-in-container"
  | "mixed-children"
  | "complex-async"
  | "generic-erasure"
  | "implicit-service"
  | "lossy-transform"
  | "unsupported-syntax"
  | "var-declaration";

export type WarningLevel = "all" | "unsupported" | "none";

export interface CompilerWarning {
  code: WarningCode;
  message: string;
  file?: string;
  line?: number;
  column?: number;
}

export class WarningCollector {
  private warnings: CompilerWarning[] = [];
  private level: WarningLevel;
  private strict: boolean;

  constructor(level: WarningLevel = "all", strict: boolean = false) {
    this.level = level;
    this.strict = strict;
  }

  warn(warning: CompilerWarning): void {
    if (this.shouldEmit(warning.code)) {
      this.warnings.push(warning);
    }
  }

  getWarnings(): readonly CompilerWarning[] {
    return this.warnings;
  }

  hasErrors(): boolean {
    return this.strict && this.warnings.length > 0;
  }

  format(): string {
    return this.warnings
      .map((w) => {
        const loc = w.file
          ? `${w.file}:${w.line ?? 0}:${w.column ?? 0} `
          : "";
        return `warning: ${loc}[${w.code}] ${w.message}`;
      })
      .join("\n");
  }

  private shouldEmit(code: WarningCode): boolean {
    if (this.level === "none") return false;
    if (this.level === "unsupported") {
      return code.startsWith("unsupported");
    }
    return true;
  }
}
