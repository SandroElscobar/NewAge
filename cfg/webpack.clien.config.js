const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
require('dotenv').config()
const NODE_ENV = process.env.NODE_ENV


module.exports = {
    mode: NODE_ENV ? 'development' : "production",
    resolve: {
        extensions: ['.js', '.ts', '.json']
    },
    entry: path.resolve(__dirname, '../src/client/client.js'),
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: "bundle.client.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.[ts]s$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif|env|glb|gltf|stl)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 8192,
                            publicPath: "/",
                            name: '[name].[ext]',
                            outputPath: 'assets'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                inject: true,
                template: 'src/index.html',
            }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        static: "dist",
        hot: true,
        devMiddleware: {
            writeToDisk: true,
            publicPath: "/"
        },
        open: true
    },
    devtool: 'source-map'
}
