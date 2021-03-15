const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

/**
 * 
 *  SETUP YOUR PERFECT  " WEBPACK DEVELOPMENT BUILD ENVIRONMENT " FOR REACT
 * 
 */
module.exports = {
    mode: 'development', // default devtool: 'eval'
    entry: {
        main: ['webpack-hot-middleware/client?path=//localhost:8080/__webpack_hmr&reload=true', './src/index.js'] //Hot Module Reloading
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'web', // Make web variables accessible to webpack, e.g. window
    optimization: {
        splitChunks: { // allows us to extract common dependencies into an existing entry chunk or an entirely new chunk
            chunks: 'all',
            name: 'vendors'
        },
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                }
            },

            {
                /**
                 * "babel preset env" for compiling modern Javascript down to ES5
                 * "babel preset react" for compiling JSX and other stuff down to Javascript
                 * "babel-loader" is the webpack loader responsible for talking to Babel.
                 * Babel is a transpiler (translates code in one language to another computer language at the same abstraction level) 
                 * that can turn our ES6 code into ES5. 
                 * browser support and backwards compatibility for your application
                 * For every file with a .js or .jsx extension Webpack pipes the code through babel-loader with ".babelrc"
                 */
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            //Boostrap Sass source files as part of your project’s bundling process.
            {
                // test: /\.(sass|scss)$/,
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: 'style-loader' }, // inject CSS  to the DOM by injecting a `<style>` tag
                    { loader: 'css-loader', options: { sourceMap: true } }, // translates CSS into CommonJS modules
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function () { // postcss plugins, can be exported to postcss.config.js
                                return [autoprefixer];
                            }
                        }
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } } // compiles Sass to CSS
                ]
            },
            // combine css files into single "main.css"
            {
                test: /\.(css)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true, modules: { namedExport: true }
                        }
                    },
                    { loader: 'css-loader' }
                ]
            },
            {
                // Loads the images,font and Javascript files into html template provided.
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: { name: '[name].[ext]', outputPath: 'images' }
            },
            // {
            //     test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            //     use: [{
            //       loader: 'file-loader',
            //       options: {
            //         name: 'fonts/[name].[ext]',
            //         publicPath: '/'
            //       }
            //     }]
            //   },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins 
                test: /\.html$/,
                use: [{ loader: "html-loader", options: { minimize: true } }]
            }
        ]
    },

    plugins: [
        // new webpack.ProgressPlugin(),
        // Re-generate index.html with injected script tag.
        // The injected script tag contains a src value of the
        // filename output defined above.
        new HtmlWebPackPlugin({
            inject: true,
            favicon: "./src/images/Loader.gif",
            template: "./src/index.html",
            filename: "./index.html",
            excludeChunks: ['client'] //we don’t want to be included into our HTML file, since that is the webserver, and not needed in the app itself.
        }),
        /*
        new HtmlWebPackPlugin({
            minify:true,
            favicon:"./src/images/Loader.gif",
            hash: true,
            template: "./src/index.html",
            filename: "./index.html"
          }),
          */
        // new webpack.BannerPlugin({
        //     banner: 'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase]'
        // }),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ]





} // end of module export











