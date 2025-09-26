#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const args = process.argv.slice(2);
const projectName = args[0] || "my-app";

if (existsSync(projectName)) {
  console.error(`Error: Directory "${projectName}" already exists.`);
  process.exit(1);
}

mkdirSync(`${projectName}/src`, { recursive: true });
console.log(`Project "${projectName}" created successfully.`);

execSync("npm init -y", { cwd: path.resolve(projectName), stdio: "inherit" });
console.log("Initialized project with src/folder");

execSync("npm i -D typescript ts-node @types/node", {
  cwd: path.resolve(projectName),
  stdio: "inherit",
});

console.log("Installed dev dependencies");

const pkgPath = path.resolve(projectName, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

pkg.scripts = {
  dev: "ts-node src/index.ts",
  build: "tsc",
  start: "node dist/index.js",
};

pkg.main = "dist/index.js";

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("Updated package.json with scripts");

// 7️⃣ Write tsconfig.json
const tsconfig = {
  compilerOptions: {
    target: "ES2020",
    module: "ESNext",
    moduleResolution: "Node",
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    outDir: "dist",
  },
  include: ["src"],
};

writeFileSync(
  path.join(projectName, "tsconfig.json"),
  JSON.stringify(tsconfig, null, 2)
);

console.log("Created tsconfig.json");

writeFileSync(
  path.join(projectName, "src", "index.ts"),
  `console.log("Hello, World!");\n`
);
console.log("Created src/index.ts");

console.log(`\nSetup complete! To get started:\n`);
console.log(`  cd ${projectName}`);
console.log(`  npm run dev`);
console.log(`\nHappy coding! 🚀`) ;
