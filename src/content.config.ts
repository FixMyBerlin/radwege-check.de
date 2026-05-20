import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import { parse } from 'csv-parse/sync'

const sceneRowSchema = z
  .object({
    id: z.string(),
    sceneId: z.string(),
  })
  .passthrough()

function parseScenesCsv(text: string) {
  const rows = parse(text, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as Record<string, string>[]
  return rows.map((row) => ({
    id: String(row.sceneId ?? row.sceneIdCar ?? ''),
    ...row,
  }))
}

const scenesPrimary = defineCollection({
  loader: file('src/scenes/scenes_primary.csv', {
    parser: (text) => parseScenesCsv(text),
  }),
  schema: sceneRowSchema,
})

const scenesSecondary = defineCollection({
  loader: file('src/scenes/scenes_secondary.csv', {
    parser: (text) => parseScenesCsv(text),
  }),
  schema: sceneRowSchema,
})

export const collections = { scenesPrimary, scenesSecondary }
