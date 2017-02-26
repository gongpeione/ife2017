const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');

const srcDir = path.resolve(__dirname, './src');
const distDir = path.resolve(__dirname, './docs');
const staticDir = path.resolve(__dirname, './static');

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js'
});
const hotReplacement = new webpack.HotModuleReplacementPlugin();
const extract = new ExtractTextPlugin('style.css');
const htmlPlugin = new HtmlWebpackPlugin({
    title: 'Geeku',
    template: path.resolve(__dirname, './index.html'),
    inject: 'body',
    hash: true,
    minify: {
        collapseWhitespace: true
    }
});
const postcss = new webpack.LoaderOptionsPlugin({
    options: {
        postcss: function () {
            return [
                autoprefixer({
                    remove: false,
                    browsers: ['ie >= 9', '> 1% in CN'],
                }),
                precss
            ];
        },
    }
});
const copyStatic = new copy([
    {
        from: './static',
        to: './static'
    }
]);

module.exports = {
    entry: {
        'src': srcDir,
    },
    output: {
        path: distDir,
        // publicPath: 'static',
        filename: 'index.js',
    },
    module: {
        loaders: [
            {
                test: /template\.html$/,
                use: ['html-loader?root=./static/']
            },
            {
                test: /\.woff$|\.ttf$|\.wav$|\.mp3$/,
                use: ['file-loader']
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
                use: ['file-loader?limit=8192&name=static/[hash:8].[name].[ext]']
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0&cacheDirectory'],
                exclude: /node_modules/
            },
            {
                test: /\.css$|\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize", 'sass-loader']
                })
            }
        ]
    },
    plugins: [ commonsPlugin, extract, htmlPlugin, postcss, copyStatic ],
    // watch: true,

    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
        port: 2333
    },
    devtool: '#source-map',
}