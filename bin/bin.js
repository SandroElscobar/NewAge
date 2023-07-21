const webpack = require('webpack')
const nodemon = require('nodemon')
const webpackConfig = require('../webpack.config')
const webpackDevServer = require('webpack-dev-server')
const path = require("path");

const compiler = webpack(webpackConfig)
const devServerOptions = {...webpackConfig[0].devServer}
const server = new webpackDevServer(devServerOptions, compiler)

const runServer = async () => {
    console.log("Start server...")
    await server.start()
}

runServer().then(() => console.log("Сервер запущен"))

nodemon({
    script: path.resolve(__dirname, '../dist/server/bundle.server.js'),
    watch: [
        path.resolve(__dirname, '../dist/server')
    ]
})