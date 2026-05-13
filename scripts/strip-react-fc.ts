#!/usr/bin/env bun
/// <reference types="bun" />
/**
 * Remove React.FC: use explicit parameter types instead.
 *
 * Run: `bun scripts/strip-react-fc.ts` (or `bun run strip-react-fc`).
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(scriptDir, '..')
const srcDir = path.join(root, 'src')

async function* walkTsx(): AsyncGenerator<string> {
  const glob = new Bun.Glob('**/*.tsx')
  for await (const rel of glob.scan({ cwd: srcDir, onlyFiles: true })) {
    yield path.join(srcDir, rel)
  }
}

function matchingParen(s: string, openIdx: number): number {
  let depth = 0
  let i = openIdx
  let inS: "'" | '"' | '`' | null = null
  let inLineComment = false
  let inBlockComment = false
  while (i < s.length) {
    const c = s[i]!
    const n = s[i + 1]

    if (inLineComment) {
      if (c === '\n') inLineComment = false
      i++
      continue
    }
    if (inBlockComment) {
      if (c === '*' && n === '/') {
        inBlockComment = false
        i += 2
        continue
      }
      i++
      continue
    }
    if (inS) {
      if (c === '\\' && inS !== '`') {
        i += 2
        continue
      }
      if (c === inS) inS = null
      i++
      continue
    }
    if (c === '/' && n === '/') {
      inLineComment = true
      i += 2
      continue
    }
    if (c === '/' && n === '*') {
      inBlockComment = true
      i += 2
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      inS = c
      i++
      continue
    }

    if (c === '(') depth++
    else if (c === ')') {
      depth--
      if (depth === 0) return i
    }
    i++
  }
  return -1
}

function transform(content: string): string {
  let s = content

  s = s.replace(/^export const (\w+): React\.FC = \(\) => \{/gm, 'export function $1() {')
  s = s.replace(/^const (\w+): React\.FC = \(\) => \{/gm, 'const $1 = () => {')

  let search = 0
  let out = ''
  const re = /(export )?const (\w+): React\.FC(<[^>]+>)? = \(/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s)) !== null) {
    if (m.index < search) {
      re.lastIndex = search
      continue
    }
    out += s.slice(search, m.index)

    if (s.slice(m.index + m[0].length - 1).startsWith('React.forwardRef')) {
      out += s.slice(m.index, m.index + m[0].length)
      search = m.index + m[0].length
      re.lastIndex = search
      continue
    }

    const exportKw = m[1] || ''
    const name = m[2]!
    const typeArg = m[3]
    const typeName = typeArg ? typeArg.slice(1, -1).trim() : null
    const openParen = m.index + m[0].length - 1
    const closeParen = matchingParen(s, openParen)
    if (closeParen < 0 || !typeName) {
      out += s.slice(m.index, m.index + m[0].length)
      search = m.index + m[0].length
      re.lastIndex = search
      continue
    }

    const inner = s.slice(openParen + 1, closeParen)
    const after = s.slice(closeParen + 1)
    const arrow = after.match(/^\s*=>/)
    if (!arrow) {
      out += s.slice(m.index, closeParen + 1)
      search = closeParen + 1
      re.lastIndex = search
      continue
    }

    const trimmed = inner.trim()
    let newParams: string
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      newParams = `{${trimmed.slice(1, -1)}}: ${typeName}`
    } else if (/^[a-zA-Z_$][\w$]*$/.test(trimmed)) {
      newParams = `${trimmed}: ${typeName}`
    } else {
      out += s.slice(m.index, closeParen + 1 + arrow[0].length)
      search = closeParen + 1 + arrow[0].length
      re.lastIndex = search
      continue
    }

    out += `${exportKw}const ${name} = (${newParams})${arrow[0]}`
    search = closeParen + 1 + arrow[0].length
    re.lastIndex = search
  }
  out += s.slice(search)
  return out
}

for await (const file of walkTsx()) {
  if (file.endsWith('Link.tsx')) continue
  const before = await Bun.file(file).text()
  if (!before.includes('React.FC')) continue
  const after = transform(before)
  if (after !== before) {
    await Bun.write(file, after)
    console.log(path.relative(root, file))
  }
}
