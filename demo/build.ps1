# Build the Gem Clicker demo
# Compiles Tailwind CSS -> rbx-css -> Luau, then TSX -> Luau

$ScriptDir = $PSScriptRoot
$ProjectRoot = Split-Path $ScriptDir -Parent
$RbxCssRoot = Join-Path (Split-Path $ProjectRoot -Parent) "rbx-css"

$Src = Join-Path $ScriptDir "src"
$ClientSrc = Join-Path $Src "client"
$Out = Join-Path $ScriptDir "out"

# Clean output
if (Test-Path $Out) { Remove-Item $Out -Recurse -Force }
New-Item -ItemType Directory -Path $Out -Force | Out-Null

# Step 1: Tailwind CSS -> flat CSS
Write-Host "=== Compiling Tailwind CSS ==="
bunx @tailwindcss/cli -i "$ClientSrc/styles.css" -o "$ClientSrc/game.css" --minify=false

# Step 2: Compile CSS -> .style.luau + manifest
Write-Host ""
Write-Host "=== Compiling CSS (rbx-css) ==="
New-Item -ItemType Directory -Path "$Out/client" -Force | Out-Null
bun "$RbxCssRoot/src/index.ts" compile "$ClientSrc/game.css" -o "$Out/client/game.style.luau" --manifest

# Step 3: Compile TSX/TS -> .luau
Write-Host ""
Write-Host "=== Compiling TSX (rbx-tsx) ==="
bun "$ProjectRoot/src/index.ts" compile "$Src" -o "$Out"

Write-Host ""
Write-Host "=== Done ==="
Write-Host "Output in: $Out"
Get-ChildItem $Out -Recurse -File
