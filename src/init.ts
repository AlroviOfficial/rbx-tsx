import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join, basename, resolve } from "path";
import { execSync } from "child_process";

export interface InitOptions {
  name?: string;
  pm?: "wally" | "pesde";
}

export function handleInit(
  directory: string | undefined,
  opts: InitOptions
): void {
  const targetDir = directory ? resolve(directory) : process.cwd();
  const projectName = opts.name || basename(targetDir);
  const isPesde = opts.pm === "pesde";

  console.log(`\nInitializing rbx-tsx project: ${projectName}\n`);

  // Create directory structure
  const dirs = ["src/client", "src/server", "src/shared", "out"];
  for (const dir of dirs) {
    mkdirSync(join(targetDir, dir), { recursive: true });
  }

  // Generate files
  const files: [string, string][] = [
    ["package.json", packageJson(projectName)],
    ["tsconfig.json", TSCONFIG],
    [
      isPesde ? "pesde.toml" : "wally.toml",
      isPesde ? pesdeToml(projectName) : wallyToml(projectName),
    ],
    [
      "default.project.json",
      projectJson(projectName, isPesde ? "roblox_packages" : "Packages"),
    ],
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

  // Install npm dependencies (for rbx-tsx types)
  console.log("\nInstalling dependencies...");
  try {
    execSync("bun install", { cwd: targetDir, stdio: "inherit" });
  } catch {
    try {
      execSync("npm install", { cwd: targetDir, stdio: "inherit" });
    } catch {
      console.log(
        "Could not install npm dependencies. Run 'bun install' or 'npm install' manually."
      );
    }
  }

  // Install Roblox packages
  if (isPesde) {
    console.log("\nInstalling Roblox packages with pesde...");
    try {
      execSync("pesde install", { cwd: targetDir, stdio: "inherit" });
    } catch {
      console.log(
        "Could not run pesde. Install it from https://pesde.dev"
      );
      console.log("Then run: pesde install");
    }
  } else {
    console.log("\nInstalling Roblox packages with wally...");
    try {
      execSync("wally install", { cwd: targetDir, stdio: "inherit" });
    } catch {
      console.log(
        "Could not run wally. Install it from https://github.com/UpliftGames/wally"
      );
      console.log("Then run: wally install");
    }
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

function packageJson(name: string): string {
  const pkg = {
    name,
    private: true,
    devDependencies: {
      "rbx-tsx": "^0.1.0",
    },
  };
  return JSON.stringify(pkg, null, 2) + "\n";
}

const TSCONFIG =
  JSON.stringify(
    {
      compilerOptions: {
        target: "ESNext",
        lib: ["ESNext"],
        module: "ESNext",
        moduleResolution: "bundler",
        jsx: "react",
        strict: true,
        noEmit: true,
        skipLibCheck: true,
      },
      include: ["src/**/*", "node_modules/rbx-tsx/types/**/*"],
    },
    null,
    2
  ) + "\n";

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

function pesdeToml(name: string): string {
  return `[package]
name = "developer/${name}"
version = "0.1.0"

[target]
environment = "roblox"

[indices]
default = "https://registry.pesde.dev"

[dependencies]
React = { name = "jsdotlua/react", version = "^17.1.0" }
ReactRoblox = { name = "jsdotlua/react-roblox", version = "^17.1.0" }
`;
}

function projectJson(name: string, packagesDir: string): string {
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
          $path: packagesDir,
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
  print(\`\${player!.Name} joined the game\`);
});

print("Server started!");
`;
