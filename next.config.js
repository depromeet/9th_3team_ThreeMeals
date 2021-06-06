/* eslint-disable */
const withTM = require('next-transpile-modules')(['lodash-es'])
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([[withBundleAnalyzer], [withImages], [withTM]], {
  target: 'serverless',
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer, webpack }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    if (isServer) {
      config.plugins.push(new webpack.IgnorePlugin(/canvas|jsdom/, /konva/))
    }
    return config
  },
  webpackDevMiddleware: (config) => {
    return config
  },
})
