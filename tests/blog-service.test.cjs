const { test, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { createRequire } = require('node:module')
const ts = require('typescript')
const snapshot = require('../src/content/blog.json')

const filename = path.join(__dirname, '../services/blog.ts')
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText
const localRequire = createRequire(filename)
const service = { exports: {} }
// Request memoization belongs to React's server dispatcher; test network semantics here.
new Function('require', 'module', 'exports', compiled)(
  name => name === 'react' ? { cache: fn => fn } : localRequire(name),
  service, service.exports,
)
const { getBlogData, getBlogDetail, getComments, BlogUnavailableError } = service.exports
const originalFetch = global.fetch
afterEach(() => { global.fetch = originalFetch })

const article = { id: 42, slug: 'a-real-article-ab12', published_at: '2026-05-01', collection_id: 9, cover_image: null }
const detail = { ...article, user: { username: 'ezzeddinp' }, body_markdown: '# Hello' }
function stub(handler) {
  const calls = []
  global.fetch = async (url, options) => {
    calls.push({ url, options })
    return handler(url, options)
  }
  return calls
}
const json = data => Response.json(data)

test('public article list includes series entries and needs no secret API key', async () => {
  const calls = stub(() => json([article]))
  assert.deepEqual(await getBlogData(), [article])
  assert.equal(calls.length, 1)
  assert.match(calls[0].url, /username=ezzeddinp&per_page=100&page=1$/)
  assert.equal(calls[0].options.headers['api-key'], undefined)
  assert.equal(calls[0].options.next.revalidate, 3600)
  assert.ok(calls[0].options.signal instanceof AbortSignal)
})

test('pagination does not lose articles after the first 100', async () => {
  const first = Array.from({ length: 100 }, (_, i) => ({ ...article, id: i }))
  const calls = stub(url => json(url.endsWith('page=1') ? first : [{ ...article, id: 100 }]))
  assert.equal((await getBlogData()).length, 101)
  assert.equal(calls.length, 2)
})

test('full slugs and old shortened links resolve the same article', async () => {
  stub(url => json(url.includes('/articles?') ? [article] : detail))
  assert.equal((await getBlogDetail({ slug: article.slug })).id, 42)
  assert.equal((await getBlogDetail({ slug: article.slug.slice(0, -5), id: 42 })).id, 42)
})

test('wrong slugs and arbitrary IDs cannot select a different article', async () => {
  const calls = stub(() => json([article]))
  assert.equal(await getBlogDetail({ slug: 'does-not-exist', id: 42 }), null)
  assert.equal(calls.length, 1)
})

test('foreign article data is not exposed', async () => {
  stub(url => json(url.includes('/articles?') ? [article] : { ...detail, user: { username: 'someone-else' } }))
  assert.equal(await getBlogDetail({ slug: article.slug }), null)
})

test('a confirmed missing article is distinguished from upstream failure', async () => {
  stub(url => url.includes('/articles?') ? json([article]) : new Response('', { status: 404 }))
  assert.equal(await getBlogDetail({ slug: article.slug }), null)
  stub(() => new Response('', { status: 503 }))
  await assert.rejects(getBlogDetail({ slug: article.slug }), BlogUnavailableError)
})

test('network errors use the verified catalog and do not create a false 404 for unknown posts', async () => {
  stub(() => { throw new Error('offline') })
  assert.equal((await getBlogData()).length, snapshot.list.length)
  await assert.rejects(getBlogDetail({ slug: article.slug }), BlogUnavailableError)
})

test('a timed out upstream request is handled as unavailable', async () => {
  stub(() => { throw new DOMException('Timed out', 'TimeoutError') })
  assert.equal((await getBlogData()).length, snapshot.list.length)
  await assert.rejects(getBlogDetail({ slug: 'unknown-new-article' }), BlogUnavailableError)
})

test('published articles remain readable when the upstream API is unavailable', async () => {
  stub(() => { throw new Error('offline') })
  const saved = snapshot.details[0]
  assert.equal((await getBlogDetail({ slug: saved.slug })).body_markdown, saved.body_markdown)
})

test('known article covers are served locally instead of waiting for the external image CDN', async () => {
  stub(() => json(snapshot.list))
  const blogs = await getBlogData()
  assert.ok(blogs.every(blog => blog.cover_image.startsWith('/blog/')))
})

test('an explicit upstream deletion is respected even when a snapshot exists', async () => {
  stub(url => url.includes('/articles?') ? json(snapshot.list) : new Response('', { status: 404 }))
  assert.equal(await getBlogDetail({ slug: snapshot.details[0].slug }), null)
})

test('optional comments fail gracefully and reject malformed IDs', async () => {
  const calls = stub(() => { throw new Error('offline') })
  assert.deepEqual(await getComments(42), [])
  assert.deepEqual(await getComments('42&other=1'), [])
  assert.deepEqual(await getComments(), [])
  assert.equal(calls.length, 1)
  assert.match(calls[0].url, /comments\?a_id=42$/)
})
