'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Customized babel loader with the minimum we need to get `mdx` libraries
// working, which unfortunately codegen JSX instead of JS.
const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    // Use user-provided .babelrc
    babelrc: true,
    // ... with some additional needed options.
    presets: [require.resolve('@babel/preset-react')]
  }
}

/**
 * Base configuration for the CLI, core, and examples.
 */

const config = {
  mode: 'development',
  entry: './src/index.js', // Default for boilerplate generation.
  output: {
    path: path.resolve('dist'),
    filename: 'deck.js'
  },
  devtool: 'source-map',
  module: {
    // Not we use `require.resolve` to make sure to use the loader installed
    // within _this_ project's `node_modules` traversal tree.
    rules: [
      {
        test: /\.jsx?$/,
        use: [babelLoader]
      },
      {
        test: /\.mdx$/,
        use: [babelLoader, require.resolve('spectacle-mdx-loader')]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[contenthash].[ext]'
        }
      }
    ]
  },
  // Default for boilerplate generation.
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Spectacle presentation',
      template: './src/index.html'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.module.rules.push({
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
  })

  config.plugins.push(new MiniCssExtractPlugin())
} else {
  config.module.rules.push({
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  })
}

module.exports = config
