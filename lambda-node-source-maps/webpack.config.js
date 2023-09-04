const path = require("path");
const ZipPlugin = require("zip-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  plugins: [
    new ZipPlugin({
      filename: "build.zip",
    }),
  ],
  devtool: "source-map",
};
