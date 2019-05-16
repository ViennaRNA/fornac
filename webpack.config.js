var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + '/app',
  mode: 'development',
  entry: {
      fornac: './scripts/fornac.js',
      rnaplot: ['./scripts/rnaplot.js'],
      rnatreemap: './scripts/rnatreemap.js'
  },
  output: {
    path: __dirname + '.tmp/scripts',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin({
      filename: ".tmp/styles/[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  }

};
