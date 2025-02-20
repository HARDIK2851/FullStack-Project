const path = require('path');
// const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: { app: './JSX/app.jsx' },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Add support for resolving .jsx files
        modules: [path.resolve(__dirname, 'JSX'), 'node_modules'], // Add 'src' directory to modules to resolve imports
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    ie: '11',
                                    edge: '15',
                                    safari: '10',
                                    firefox: '50',
                                    chrome: '49',
                                },
                            }],
                            '@babel/preset-react',
                        ],
                    },
                },
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
          },
        ],
    },
    optimization: {
        splitChunks: { name: 'vendor', chunks: 'all', },
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true',
        }),
    ],
    devtool: 'source-map',
};
