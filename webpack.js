const webpack = require("webpack");

const path = require("path");

const buildDir = path.resolve(__dirname, "build/static");
const packageDir = path.resolve(__dirname, "packages/js");

const entry = {
  "main": path.resolve(__dirname, "main.js")
}

const values = obj => Object.keys(obj).map(k => obj[k]);

module.exports = {
  entry,
  output: {
    path: buildDir,
    publicPath: "/static/",
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.js?/, include: values(entry).concat([packageDir]), loader: "babel-loader" },
      { test: /\.json$/, loader: "json" },
      { test: /\.(jpe?g|gif|png|svg)$/i, loader: "url?limit=10000" }
    ]
  },
  resolve: {
    alias: {
      pkg: packageDir,
      lib: packageDir + "/__lib__",
      style: packageDir + "/__style__"
    },
    extensions: [".webpack.js", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ]
};
