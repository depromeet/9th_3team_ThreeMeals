import React from 'react'
import fs from 'fs'

const Sitemap = () => {}

export const getServerSideProps = ({ res }) => {
  const baseUrl = {
    development: 'http://localhost:3002',
    production: 'https://d3egwu5gw26rxc.cloudfront.net',
    test: 'http://localhost:3002',
  }

  const host = baseUrl[process.env.NODE_ENV]

  const staticPages = fs
    .readdirSync('pages')
    .map((pageFile) => pageFile.replace(/.tsx?/g, ''))
    .filter((staticPage) => {
      return !['_app', '_document', '_error', 'sitemap.xml'].includes(
        staticPage
      )
    })
    .map((staticPagePath) => {
      return `${host}/${staticPagePath}`
    })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
