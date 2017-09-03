const webpack = require('webpack')
const path    = require('path')
const fs      = require('fs')

const env = process.argv[2]
const nodeModules = {}
let outputPath
fs.readdirSync('node_modules')
    .filter((x) => {
        return ['.bin'].indexOf(x) === -1
    })
    .forEach((mod) => {
        nodeModules[mod] = 'commonjs ' + mod
    })


if (env === 'release') {
    outputPath = path.join(__dirname, 'release')
} else {
    outputPath = path.join(__dirname, 'build')
}

module.exports = {
    externals: nodeModules,
    target: 'node',
    entry: {
        main: './src/main'
    },
    output: {
        filename: '[name].js',
        path: outputPath
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
            path.resolve('./private_resources')
        ]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2017']
            },
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    }
}
