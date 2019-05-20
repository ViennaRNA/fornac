var path = require("path");
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
  entry: {
      fornac: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  },
  devServer: {
    contentBase: path.join(__dirname, 'examples'),
    watchContentBase: true,
    compress: true,
    port: 9000,
    hot: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  externals: {
    d3: "d3"
  }
};

module.exports = (env, argv) => {
  console.log('Running mode: ', argv.mode)

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  return config;
};
