/* eslint-disable */
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([[withBundleAnalyzer], [withImages]], {
  images: {
    domains: ['www.fillmurray.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    return config
  },
  webpackDevMiddleware: (config) => {
    return config
  },
})
