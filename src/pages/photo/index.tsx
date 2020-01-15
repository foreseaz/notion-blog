import Link from 'next/link'
import Header from '../../components/header'

import photoStyles from '../../styles/photo.module.css'
import sharedStyles from '../../styles/shared.module.css'

import { getPostLink, getDateStr, postIsReady } from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getPhotoIndex from '../../lib/notion/getPhotoIndex'

export async function unstable_getStaticProps() {
  const postsTable = await getPhotoIndex()

  console.log('-----------------', postsTable)
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!postIsReady(post)) {
        return null
      }

      return post
    })
    .filter(Boolean)

  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default ({ posts = [] }) => {
  return (
    <>
      <Header titlePre="Blog" />
      <div className={`${sharedStyles.layout} ${photoStyles.blogIndex}`}>
        <h1>Foreseaz</h1>
        {posts.length === 0 && (
          <p className={photoStyles.noPosts}>There are no albums yet</p>
        )}
        <div className={photoStyles.grid}>
          {posts.map(post => {
            return (
              <div className={photoStyles.cell} key={post.Slug}>
                <Link href="/photo/[slug]" as={getPostLink('photo', post.Slug)}>
                  <div className={photoStyles.preview}>
                    {!post.Preview && 'No preview available'}
                    {!!post.Preview && (
                      <img
                        src={`/api/asset?assetUrl=${encodeURIComponent(
                          post.Preview as any
                        )}&blockId=${post.id}`}
                      />
                    )}
                  </div>
                </Link>
                <Link href="/photo/[slug]" as={getPostLink('photo', post.Slug)}>
                  <p className={photoStyles.title}>
                    <a>{post.Name}</a>
                  </p>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
