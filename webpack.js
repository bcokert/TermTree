const webpack = require("webpack");

const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "static/");
const APP_DIR = path.resolve(__dirname, "src/js");

const config = {
    entry: {
        main: APP_DIR + "/index.js"
    },
    output: {
        path: BUILD_DIR,
        publicPath: "/static/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js?/, include: APP_DIR, loader: "babel-loader"},
            {test: /\.json$/, loader: "json"},
            {test: /\.(jpe?g|gif|png|svg)$/i, loader: "url?limit=10000"}
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ]
};

module.exports = config;

