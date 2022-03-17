var path = require("path");
var webpack = require('webpack');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

module.exports = {
  entry: {
      fornac: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  },
  optimization: {
    minimize: true
  },
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'examples'),
    compress: true,
    port: 9000,
    hot: true
  },
  plugins: [
      new ExtractCssChunks(
          {
            filename: "[name].css",
            chunkFilename: "[id].css",
            orderWarning: true,
          }
      ),
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
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
           loader:ExtractCssChunks.loader,
           options: {
              hot: true,
              //reloadAll: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
	      	localIdentName: '[name]-[local]',
	      },
              sourceMap: true,
            }
          }
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
    fallback: { "buffer": require.resolve("buffer") },
  },
  externals: {
    d3: "d3"
  }
};
