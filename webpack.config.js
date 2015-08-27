module.exports = {
    context: __dirname + "/src",
    entry: {
        javascript: "./js/index.js",
        html: "./html/index.html",
    },
    output: {
        path: __dirname + "/dist",
        filename: "app.js",
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: "source-map-loader"
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["babel-loader?stage=1&optional=runtime"],
        }, {
            test: /\.html$/,
            loader: "file?name=[name].[ext]",
        }],
    }

}
