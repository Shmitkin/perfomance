const path = require(`path`);
const pathToPublic = path.join(__dirname, `public`);
const TerserPlugin = require(`terser-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = {
  mode: `production`,
  entry: {bundle: [`./src/index.js`, `./src/styles/style.scss`]},
  output: {
    filename: `[name].js`,
    path: pathToPublic,
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
        use: [
          MiniCssExtractPlugin.loader,
          `css-loader`,
          `sass-loader`,
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      extractComments: false,
      terserOptions: {format: {comments: false}},
    })],
  },

  plugins: [
    new MiniCssExtractPlugin({filename: `[name].css`}),
  ],
};
