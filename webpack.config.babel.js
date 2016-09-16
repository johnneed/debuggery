import webpack from 'webpack';

 const nodeEnv = 'development';

export default {
    entry: "./public/es5/factorial.js",

    output: {
        path: './public/es5',
        filename: 'factorial-debug.js',
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
        ],
    },



    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
        }),
    ],

    devtool: 'source-map',
};