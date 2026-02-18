#!/bin/bash
# Build the Gem Clicker demo
# Compiles CSS (rbx-css) and TSX (rbx-tsx) into Luau output

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
RBX_CSS_ROOT="$(dirname "$PROJECT_ROOT")/rbx-css"

SRC="$SCRIPT_DIR/src"
OUT="$SCRIPT_DIR/out"

# Clean output
rm -rf "$OUT"
mkdir -p "$OUT"

# Step 1: Compile CSS → .style.luau + manifest
echo "=== Compiling CSS ==="
bun "$RBX_CSS_ROOT/src/index.ts" compile "$SRC/game.css" \
  -o "$OUT/game.style.luau" --manifest

# Step 2: Compile TSX → .luau (manifest auto-loaded if --css used with rbx-css on PATH)
echo ""
echo "=== Compiling TSX ==="
bun "$PROJECT_ROOT/src/index.ts" compile "$SRC" -o "$OUT"

echo ""
echo "=== Done ==="
echo "Output in: $OUT"
ls -la "$OUT"
