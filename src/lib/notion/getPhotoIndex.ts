import { Sema } from 'async-sema'
import rpc, { values } from './rpc'
import getTableData from './getTableData'
import { getPostPreview } from './getPostPreview'
import { readFile, writeFile } from '../fs-helpers'
import { BLOG_INDEX_ID, BLOG_INDEX_CACHE } from './server-constants'

export default async function getBlogIndex(previews = true) {
  let postsTable: any = null
  const isProd = process.env.NODE_ENV === 'production'
  const cacheFile = `${BLOG_INDEX_CACHE}${previews ? '_previews' : ''}`

  if (isProd) {
    try {
      postsTable = JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch (_) {
      /* not fatal */
    }
  }

  if (!postsTable) {
    try {
      const data = await rpc('loadPageChunk', {
        pageId: BLOG_INDEX_ID,
        limit: 999, // TODO: figure out Notion's way of handling pagination
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false,
      })

      // Parse table with posts
      const tableBlock = values(data.recordMap.block).find(
        (block: any) =>
          block.value.type === 'collection_view' &&
          block.value.id === '2c462348-3baf-46a2-8121-1e93aa9ba002' // hack for two collection_view
      )

      postsTable = await getTableData(tableBlock, true)
    } catch (err) {
      console.error(
        `\nFailed to load Notion posts, did you configure your Notion table as an inline table according to https://github.com/ijjk/notion-blog#creating-your-pages-table\n`
      )
      console.error(err)
      postsTable = {}
    }

    console.log('~~~~~~~~~~~~photoTables', postsTable)

    if (isProd) {
      writeFile(cacheFile, JSON.stringify(postsTable), 'utf8').catch(() => {})
    }
  }

  return postsTable
}
