const path = require('path')
const fs = require("fs")

const context = path.join(__dirname, '..', 'src')
const outputpath = path.join(__dirname, '..', 'server')

// Node module dependencies should not be bundled
const externals = fs.readdirSync("node_modules")
    .reduce(function(acc, mod) {
        if (mod === ".bin") {
            return acc
        }

        acc[mod] = "commonjs " + mod
            return acc
    }, {})

module.exports = {
    context: context,
    entry: './server.js',
    output: {
        path: outputpath,
        filename: 'index.js'
    },
    target: 'node',
    externals: externals,
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            resolve: {
                extensions: [".js"]
            },
            use: {
                loader: "babel-loader"
            }
        }]
    }
}
