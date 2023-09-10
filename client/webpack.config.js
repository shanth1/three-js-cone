const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {},
        },
        "css-loader",
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

const config = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./index.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    optimization: { splitChunks: { chunks: "all" } },
    devServer: {
        static: "./",
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: { collapseWhitespace: isProd },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isDev ? "[name].css" : "[name].[contenthash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders("sass-loader"),
            },
            { test: /\.(png|jpg|svg)$/, use: ["file-loader"] },
            { test: /\.(ttf|woff|woff2|eot)$/, use: ["file-loader"] },
        ],
    },
};

module.exports = config;
