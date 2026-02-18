#!/bin/bash
# Build the Gem Clicker demo
# Compiles Tailwind CSS → flat CSS → rbx-css → Luau, then TSX → Luau

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
RBX_CSS_ROOT="$(dirname "$PROJECT_ROOT")/rbx-css"

SRC="$SCRIPT_DIR/src"
OUT="$SCRIPT_DIR/out"

# Clean output
rm -rf "$OUT"
mkdir -p "$OUT"

# Step 1: Tailwind CSS → flat CSS
echo "=== Compiling Tailwind CSS ==="
bunx @tailwindcss/cli -i "$SRC/styles.css" -o "$SRC/game.css" --minify=false

# Step 2: Compile CSS → .style.luau + manifest
echo ""
echo "=== Compiling CSS (rbx-css) ==="
bun "$RBX_CSS_ROOT/src/index.ts" compile "$SRC/game.css" \
  -o "$OUT/game.style.luau" --manifest

# Step 3: Compile TSX → .luau (manifest auto-loaded if --css used with rbx-css on PATH)
echo ""
echo "=== Compiling TSX (rbx-tsx) ==="
bun "$PROJECT_ROOT/src/index.ts" compile "$SRC" -o "$OUT"

echo ""
echo "=== Done ==="
echo "Output in: $OUT"
ls -la "$OUT"
