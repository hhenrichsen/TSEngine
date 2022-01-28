module.exports = {
  context: __dirname,
  entry: './entrypoint.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'tsickle-loader',
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ClosureCompilerPlugin({
        mode: 'STANDARD', // a little misleading -- the actual compilation level is below
        childCompilations: true
      }, {
        externs: [path.resolve(__dirname, 'dist', 'externs.js')],
        languageOut: 'ECMASCRIPT5',
        compilation_level: 'ADVANCED'
      })
    ],
    usedExports: true,
    splitChunks: {
      minSize: 0
    },
    concatenateModules: true
  }
}