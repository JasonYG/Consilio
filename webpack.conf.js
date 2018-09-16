const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './leapmotion.js',
  target: 'web',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },
  devtool: 'source-map',

  devServer: {
     disableHostCheck: true,
     port: process.env.PORT || 9999
  },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                options: {
                    presets: ['env']
                }
            },
        ]
    }
};
