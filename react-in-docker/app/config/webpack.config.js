const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const context = path.join(__dirname, '..', 'src')
const outputpath = path.join(__dirname, '..', 'build')

const MODE = process.env.WEBPACK_MODE
const PORT = process.env.PORT

// plugins
const plugins = [
  new HtmlWebPackPlugin({
    template: path.join(context, "index.html"),
    filename: path.join(outputpath, "index.html"),
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].main.css',
  }),
  new SVGSpritemapPlugin(path.join(context, '/icons/**/*.svg'), {
    output: {
      filename: 'svg/sprite.svg'
    }
  }),
  new ESLintPlugin({
    context,
    eslintPath: require.resolve('eslint'),
    extensions: ['js', 'ts', 'tsx']
  })
]

const developmentPlugins = [
  ...plugins
]

const productionPlugins = [
    ...plugins
]

module.exports = {
  context: context,
  entry: {
    'gui': [
      'babel-polyfill',
      './index.tsx',
      './scss/main.scss',
    ]
  },
  output: {
    path: outputpath,
    filename: 'js/[name].main.min.js'
  },
  module: {
    rules: [{
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: 'config'
            }
          }
        },
        'sass-loader'
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../../fonts',
        }
      }]
    },
    {
      test: /\.(jpe?g|png|gif|ico)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: '../images',
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: (MODE === 'production') ? productionPlugins : developmentPlugins,
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    contentBase: path.join(__dirname, '..', 'src'),
    historyApiFallback: true,
    writeToDisk: true,
    inline: true,
    compress: true,
    headers:          { 'Access-Control-Allow-Origin': '*' },
    https:            false,
    disableHostCheck: true
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: /node_modules/
  }
}
