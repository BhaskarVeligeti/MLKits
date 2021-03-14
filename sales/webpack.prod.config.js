const path = require('path')
const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/**
 * 
 *  SETUP YOUR PERFECT  " WEBPACK PRODUCTION BUILD ENVIRONMENT " FOR REACT
 * 
 */

module.exports = {
  mode: 'production',  // Environment mode
  entry: { main: './src/index.js' },    // Entry point of app
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: "web",
  devtool:'hidden-source-map',// don't want to expose your SourceMap for the browser development tools.
  optimization: {
    splitChunks: { // allows us to extract common dependencies into an existing entry chunk or an entirely new chunk
      chunks: 'all',
      name: 'vendors'
    },
    // Webpack 4 does not have a CSS minifier, although
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      /**
 * Babel is a transpiler (translates code in one language to another computer language at the same abstraction level) 
 * that can turn our ES6 code into ES5. 
 * browser support and backwards compatibility for your application
 */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      //Boostrap Sass source files as part of your project’s bundling process.
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' }, // inject CSS  to the DOM by injecting a `<style>` tag
          { loader: 'css-loader' }, // translates CSS into CommonJS modules
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins: function () { // postcss plugins, can be exported to postcss.config.js
                return [autoprefixer];
              }
            }
          },
          { loader: 'sass-loader' } // compiles Sass to CSS
        ]
      },
      // combine custom css files into single "main.css"
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
      // Loads the images and Javascript files into html template provided.
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'url-loader',
        options: { name: '[name].[ext]', outputPath: 'images' }
      },
      // Loads the icon,font and Javascript files into html template provided.
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      // Loads the javacript into html template provided. Entry point is set below in HtmlWebPackPlugin in Plugins 
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
    ]
  },

  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebPackPlugin({
      minify:true,
      favicon:"./src/images/Loader.gif",
      hash: true,
      template: "./src/index.html",
      filename: "./index.html"
    }),
    //Long Term Caching
    new MiniCssExtractPlugin({ filename: '[name].css' })
  ]

} // end of module export











