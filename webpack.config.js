module.exports = {
    context: __dirname,
    entry: {
        javascript: "./src/js/index.js",
        html: "./src/html/index.html",
        css: "./src/css/fixed-data-table.css",
        app: ["webpack/hot/dev-server", "./dist/app.js"]
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
        }, {
            test: /\.css$/,
            loader: "file?name=[name].[ext]",
        }],
    }

}
