/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public')
    },
    module: {
        rules: [
            // babel loader 규칙
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            // style 관련 loader 규칙
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },

            {
                // write image files under 10k to inline or copy image files over 10k
                test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                // write files under 10k to inline or copy files over 10k
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './static/index.html'
        })
    ],
    devServer: {
        hot: true,
        open: true,
        port: 80,
        historyApiFallback: true
    }
};
