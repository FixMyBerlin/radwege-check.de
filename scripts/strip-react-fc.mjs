#!/usr/bin/env node
/**
 * Remove React.FC: use explicit parameter types instead.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "src");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

function matchingParen(s, openIdx) {
  let depth = 0;
  let i = openIdx;
  let inS = null;
  let inLineComment = false;
  let inBlockComment = false;
  while (i < s.length) {
    const c = s[i];
    const n = s[i + 1];

    if (inLineComment) {
      if (c === "\n") inLineComment = false;
      i++;
      continue;
    }
    if (inBlockComment) {
      if (c === "*" && n === "/") {
        inBlockComment = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }
    if (inS) {
      if (c === "\\" && inS !== "`") {
        i += 2;
        continue;
      }
      if (c === inS) inS = null;
      i++;
      continue;
    }
    if (c === "/" && n === "/") {
      inLineComment = true;
      i += 2;
      continue;
    }
    if (c === "/" && n === "*") {
      inBlockComment = true;
      i += 2;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") {
      inS = c;
      i++;
      continue;
    }

    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}

function transform(content) {
  let s = content;

  s = s.replace(/^export const (\w+): React\.FC = \(\) => \{/gm, "export function $1() {");
  s = s.replace(/^const (\w+): React\.FC = \(\) => \{/gm, "const $1 = () => {");

  let search = 0;
  let out = "";
  const re = /(export )?const (\w+): React\.FC(<[^>]+>)? = \(/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m.index < search) {
      re.lastIndex = search;
      continue;
    }
    out += s.slice(search, m.index);

    if (s.slice(m.index + m[0].length - 1).startsWith("React.forwardRef")) {
      out += s.slice(m.index, m.index + m[0].length);
      search = m.index + m[0].length;
      re.lastIndex = search;
      continue;
    }

    const exportKw = m[1] || "";
    const name = m[2];
    const typeArg = m[3];
    const typeName = typeArg ? typeArg.slice(1, -1).trim() : null;
    const openParen = m.index + m[0].length - 1;
    const closeParen = matchingParen(s, openParen);
    if (closeParen < 0 || !typeName) {
      out += s.slice(m.index, m.index + m[0].length);
      search = m.index + m[0].length;
      re.lastIndex = search;
      continue;
    }

    const inner = s.slice(openParen + 1, closeParen);
    const after = s.slice(closeParen + 1);
    const arrow = after.match(/^\s*=>/);
    if (!arrow) {
      out += s.slice(m.index, closeParen + 1);
      search = closeParen + 1;
      re.lastIndex = search;
      continue;
    }

    const trimmed = inner.trim();
    let newParams;
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      newParams = `{${trimmed.slice(1, -1)}}: ${typeName}`;
    } else if (/^[a-zA-Z_$][\w$]*$/.test(trimmed)) {
      newParams = `${trimmed}: ${typeName}`;
    } else {
      out += s.slice(m.index, closeParen + 1 + arrow[0].length);
      search = closeParen + 1 + arrow[0].length;
      re.lastIndex = search;
      continue;
    }

    out += `${exportKw}const ${name} = (${newParams})${arrow[0]}`;
    search = closeParen + 1 + arrow[0].length;
    re.lastIndex = search;
  }
  out += s.slice(search);
  return out;
}

for (const file of walk(SRC)) {
  if (file.endsWith("Link.tsx")) continue;
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes("React.FC")) continue;
  const after = transform(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    console.log(path.relative(path.join(__dirname, ".."), file));
  }
}
