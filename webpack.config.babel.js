import webpack from 'webpack';

const optimizeMinimize = false;
const nodeEnv = optimizeMinimize ? 'production' : 'development';

export default {
    entry: "./public/es5/factorial.js",

    output: {
        path: './public/es5',
        filename: optimizeMinimize ? 'factorial.min.js' : 'factorial-debug.js',
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

    devtool: optimizeMinimize ? 'source-map' : 'source-map',
};