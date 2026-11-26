import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { setTimeout as delay } from 'node:timers/promises'

const username = 'ezzeddinp'
const snapshotUrl = new URL('../src/content/blog.json', import.meta.url)
const coversOnly = process.argv.includes('--covers-only')
const existing = coversOnly ? JSON.parse(await readFile(snapshotUrl, 'utf8')) : null
async function read(path) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetch(`https://dev.to/api/${path}`, {
        headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000),
      })
      if (!response.ok) throw new Error(`DEV returned ${response.status}`)
      return await response.json()
    } catch (error) {
      if (attempt === 3) throw error
      await delay(1500 * (attempt + 1))
    }
  }
}

const list = existing?.list ?? []
for (let page = 1; !coversOnly; page++) {
  const batch = await read(`articles?username=${username}&per_page=100&page=${page}`)
  if (!Array.isArray(batch)) throw new Error('Invalid article list')
  list.push(...batch)
  if (batch.length < 100) break
}
const details = existing?.details ?? []
for (const article of coversOnly ? [] : list) {
  // Keep the refresh gentle on DEV's public API. Only write the snapshot after validation.
  await delay(1200)
  const detail = await read(`articles/${article.id}`)
  if (detail.user?.username !== username || !detail.body_markdown) throw new Error(`Invalid article ${article.id}`)
  details.push(detail)
  console.log(`Synced ${details.length}/${list.length}: ${article.slug}`)
}
if (!list.length) throw new Error('Refusing to replace the snapshot with an empty catalog')
const covers = {}
const coverDirectory = new URL('../public/blog/', import.meta.url)
await mkdir(coverDirectory, { recursive: true })
for (const article of list) {
  if (!article.cover_image) continue
  try {
    const response = await fetch(article.cover_image, { signal: AbortSignal.timeout(8000) })
    const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }[response.headers.get('content-type')?.split(';')[0]]
    if (!response.ok || !extension) continue
    const buffer = Buffer.from(await response.arrayBuffer())
    if (buffer.length > 2 * 1024 * 1024) continue
    const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 10)
    const filename = `${article.id}-${hash}.${extension}`
    await writeFile(new URL(filename, coverDirectory), buffer)
    covers[article.id] = `/blog/${filename}`
  } catch {
    console.warn(`Cover unavailable for ${article.id}; keeping the remote fallback.`)
  }
}
const directory = new URL('../src/content/', import.meta.url)
await mkdir(directory, { recursive: true })
await writeFile(snapshotUrl, JSON.stringify({ syncedAt: new Date().toISOString(), list, details, covers }, null, 2) + '\n')
console.log(`Saved ${details.length} published articles.`)
