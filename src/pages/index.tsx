import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Home" />
    <div className={sharedStyles.layout}>
      <h1>Foreseaz</h1>

      <div className="explanation">
        <p>
          This is a statically generated{' '}
          <ExtLink href="https://nextjs.org">Next.js</ExtLink> site with a{' '}
          <ExtLink href="https://notion.so">Notion</ExtLink> powered blog that
          is deployed with <ExtLink href="https://zeit.co">ZEIT</ExtLink>. It
          leverages some upcoming features in Next.js like{' '}
          <ExtLink href="https://github.com/zeit/next.js/issues/9524">
            SSG support
          </ExtLink>{' '}
          and{' '}
          <ExtLink href="https://github.com/zeit/next.js/issues/8626">
            built-in CSS support
          </ExtLink>{' '}
          which allow us to achieve all of the benefits listed above including
          blazing fast speeds, great local editing experience, and always being
          available!
        </p>

        <p>
          To see how to get started setting up the structure for your Notion
          blog see{' '}
          <Link href="/blog/[slug]" as="/blog/my-first-post">
            <a>this blog post</a>
          </Link>{' '}
          or the instructions in{' '}
          <ExtLink href="https://github.com/ijjk/notion-blog#creating-your-pages-table">
            the readme
          </ExtLink>{' '}
          for using the automated script.
        </p>
      </div>
    </div>
  </>
)
