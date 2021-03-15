const path = require('path')
const nodeExternals = require('webpack-node-externals')  // only "development"
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');


module.exports = (env, argv) => {
    const CLIENT_PATH = (argv.mode === 'production') ? './src/express/client-prod.js' : './src/express/client-dev.js'

    return ({
        entry: {
            client: CLIENT_PATH,
        },
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js'
        },
        mode: argv.mode,
        target: 'node',
        node: {
            // Need this when working with express, otherwise the build fails
            __dirname: false,   // if you don't put this is, __dirname
            __filename: false,  // and __filename return blank or /
        },
        externals: [nodeExternals()], // only "development"
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        // plugins: [
        //     // new BundleAnalyzerPlugin(),
        // ]
    }) // end of return

} // end of module export











