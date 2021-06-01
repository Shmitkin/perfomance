const path = require(`path`);
const pathToPublic = path.join(__dirname, `public`);

module.exports = {
  mode: `development`,
  entry: {bundle: [`./src/index.js`, `./src/styles/style.scss`]},
  output: {
    filename: `[name].js`,
    path: pathToPublic,
  },
  devServer: {
    contentBase: pathToPublic,
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {loader: `babel-loader`},
      },
      {
        test: /\.scss$/,
        use: [`style-loader`, `css-loader`, `sass-loader`],
      },
    ],
  },
  devtool: `source-map`,
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
