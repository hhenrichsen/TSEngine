const path = require('path');
const webpack = require('webpack');
const dev = process.argv.includes('--dev');
const mode = dev ? 'development' : 'production';

module.exports = {
  mode,
  context: __dirname,
  output: {
    path: path.resolve(__dirname),
    filename: './build/bundle.js'
  },
  devtool: dev ? 'eval-source-map' : undefined,
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    minimize: true,
    usedExports: true,
    splitChunks: {
      minSize: 0
    },
    concatenateModules: true
  }
}