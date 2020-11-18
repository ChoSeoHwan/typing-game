// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HTMLWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
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
            }
        ]
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        })
    ],
    devServer: {
        hot: true,
        open: true,
        port: 80
    }
};
