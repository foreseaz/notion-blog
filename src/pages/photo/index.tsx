import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import { getPostLink, getDateStr, postIsReady } from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getPhotoIndex from '../../lib/notion/getPhotoIndex'

export async function unstable_getStaticProps() {
  const postsTable = await getPhotoIndex()

  const authorsToGet: Set<string> = new Set()
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

  console.log('--------------;', posts, posts[0].Preview)
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
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>Foreseaz</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map(post => {
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <h3>
                <Link href="/photo/[slug]" as={getPostLink('photo', post.Slug)}>
                  <a>{post.Name}</a>
                </Link>
              </h3>
              {post.Date && (
                <div className="posted">Posted: {getDateStr(post.Date)}</div>
              )}
              <div>
                {!post.Preview && 'No preview available'}
                {!!post.Preview && <img src={post.Preview} />}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
