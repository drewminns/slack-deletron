const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dist = path.join(__dirname, 'dist', 'client');
const PROD = process.env.NODE_ENV === 'production' || 'development';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.tsx'],
  mode: PROD,
  output: {
    filename: '[name].[hash].js',
    path: dist,
    chunkFilename: '[name].bundle.js',
  },
  devtool: PROD ? 'source-map' : 'eval',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
