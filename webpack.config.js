const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'eval',

    entry: {
        main: [
            'react-hot-loader/patch',
            './src/main.scss',
            './src/main.js'
        ]
    },

    output: {
        filename:   '[name].bundle.js',
        path:       path.join(__dirname, 'dist'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.scss'],
        modules:    [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                use:     'babel-loader'
            },
            {
                test:    /\.scss$/,
                exclude: /node_modules/,
                use:     [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    devServer: {
        host:       '0.0.0.0',
        port:       9000,
        hot:        true,
        publicPath: '/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}