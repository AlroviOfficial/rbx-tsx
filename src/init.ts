import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join, basename, resolve } from "path";
import { execSync } from "child_process";

export interface InitOptions {
    name?: string;
}

export function handleInit(
    directory: string | undefined,
    opts: InitOptions,
): void {
    const targetDir = directory ? resolve(directory) : process.cwd();
    const projectName = opts.name || basename(targetDir);

    console.log(`\nInitializing rbx-tsx project: ${projectName}\n`);

    // Create directory structure
    const dirs = ["src/client", "src/server", "src/shared", "out"];
    for (const dir of dirs) {
        mkdirSync(join(targetDir, dir), { recursive: true });
    }

    // Generate files
    const files: [string, string][] = [
        ["wally.toml", wallyToml(projectName)],
        ["default.project.json", projectJson(projectName)],
        ["src/client/index.client.tsx", CLIENT_INDEX],
        ["src/client/App.tsx", CLIENT_APP],
        ["src/server/index.server.ts", SERVER_INDEX],
    ];

    for (const [filePath, content] of files) {
        const fullPath = join(targetDir, filePath);
        if (existsSync(fullPath)) {
            console.log(`  skip  ${filePath} (already exists)`);
            continue;
        }
        mkdirSync(join(targetDir, filePath, ".."), { recursive: true });
        writeFileSync(fullPath, content);
        console.log(`  create ${filePath}`);
    }

    // Try to run wally install
    console.log("\nInstalling packages with wally...");
    try {
        execSync("wally install", { cwd: targetDir, stdio: "inherit" });
    } catch {
        console.log(
            "\nCould not run wally. Install it from https://github.com/UpliftGames/wally",
        );
        console.log("Then run: wally install");
    }

    // Print next steps
    console.log(`
Done! Next steps:

  rbx-tsx compile src -o out    Compile TSX/TS to Luau
  rojo serve                    Sync to Roblox Studio
`);
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

function wallyToml(name: string): string {
    return `[package]
name = "developer/${name}"
version = "0.1.0"
registry = "https://github.com/UpliftGames/wally-index"
realm = "shared"

[dependencies]
React = "jsdotlua/react@17.1.0"
ReactRoblox = "jsdotlua/react-roblox@17.1.0"
`;
}

function projectJson(name: string): string {
    const project = {
        name,
        tree: {
            $className: "DataModel",
            StarterPlayer: {
                $className: "StarterPlayer",
                StarterPlayerScripts: {
                    $className: "StarterPlayerScripts",
                    Client: {
                        $path: "out/client",
                    },
                },
            },
            ServerScriptService: {
                $className: "ServerScriptService",
                Server: {
                    $path: "out/server",
                },
            },
            ReplicatedStorage: {
                $className: "ReplicatedStorage",
                Shared: {
                    $path: "out/shared",
                },
                Packages: {
                    $path: "Packages",
                },
            },
        },
    };
    return JSON.stringify(project, null, 2) + "\n";
}

const CLIENT_INDEX = `import React from "react";
import { createRoot } from "react-roblox";
import { Players } from "@rbx-services";
import App from "./App";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const screenGui = new Instance("ScreenGui");
screenGui.Name = "App";
screenGui.Parent = playerGui;
screenGui.ResetOnSpawn = false;
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;

const root = createRoot(screenGui);
root.render(<App />);
`;

const CLIENT_APP = `import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello, rbx-tsx!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c: number) => c + 1)}>
        Click me
      </button>
    </div>
  );
}
`;

const SERVER_INDEX = `import { Players } from "@rbx-services";

Players.PlayerAdded.Connect((player) => {
  print(\`\${player.Name} joined the game\`);
});

print("Server started!");
`;
