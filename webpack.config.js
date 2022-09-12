const HtmlWebpackPlugin = require("html-webpack-plugin") // Импортируем плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // Импортируем плагин

let mode = "development"

if (process.env.NODE_ENV === "production") {
    mode = "production"
}
console.log(mode + " mode")

module.exports = {
    mode: mode,
    output: {
        filename: "[name].[contanthash].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        allowedHosts: "all"
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contanthash].css',
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader),
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {

                                        }
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
