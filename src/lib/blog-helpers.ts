export const getPostLink = (path: string, slug: string) => {
  return `/${path}/${slug}`
}

export const getDateStr = date => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export const postIsReady = (post: any) => {
  return process.env.NODE_ENV !== 'production' || post.Published === 'Yes'
}
