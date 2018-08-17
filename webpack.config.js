const path = require("path");

module.exports = {
    entry: {
        index: ["babel-polyfill", "./src/index.js"],
        edit: ["babel-polyfill", "./src/edit.js"]
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "public/scripts")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        publicPath: "/scripts/"
    }
};
