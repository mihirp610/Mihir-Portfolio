import { expect, test } from "./fixtures";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { routes } from "./routes";

test("route registry covers every generated public route", () => {
  const routeTree = readFileSync(resolve(process.cwd(), "src/routeTree.gen.ts"), "utf8");
  const generated = [
    ...new Set(
      [...routeTree.matchAll(/^\s+'([^']+)':\s+typeof .*Route[;,]?$/gm)]
        .map((match) => match[1])
        .filter((route) => route !== "__root__"),
    ),
  ];
  expect([...routes.map((route) => route.path)].sort()).toEqual(generated.sort());
});
