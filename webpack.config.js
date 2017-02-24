const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, './src');
const distDir = path.resolve(__dirname, './dist');

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
})

module.exports = {
    entry: {
        'src': srcDir,
        // 'bacic': path.resolve(srcDir, './basic')
    },
    output: {
        path: distDir,
        publicPath: '',
        filename: 'index.js',
        // chunckFileName: '[id].bundle.js'
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loaders: ['eslint'],
        //         exclude: /node_modules/
        //     }
        // ],
        loaders: [
            {
                test: /template\.html$/,
                use: ['html-loader']
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
                // loader: extract.extract('sass-loader!postcss!css-loader?minimize')
            }
        ]
    },
    plugins: [ commonsPlugin, extract, htmlPlugin, postcss ],
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