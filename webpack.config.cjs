/* eslint-disable no-unused-vars */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entry = path.join(__dirname, '/src/index.tsx')
console.log('ENTRY: ', entry)
console.log('ENTRY: ', entry)

module.exports = {
  entry: path.resolve(__dirname, '/src/index.tsx'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist', // NEEDED?
    filename: 'bundle.js', //  TS or TSX or JS?
  },

  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV,
  devServer: {
    // host: 'localhost',
    port: 8080,
    // // match the output path
    // contentBase: path.resolve(__dirname, 'dist'),
    // enable HMR on the devServer
    hot: true, 
    // match the output 'publicPath'
    // publicPath: '/',
    // fallback to root for other urls
    historyApiFallback: true, 

    headers: { 'Access-Control-Allow-Origin': '*' }, 
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      /* '/': { 
      //   target: 'http://localhost:3000/',
      //   secure: false,
       }, */
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        // toggle loader and use
        use: {
          loader: 'ts-loader',
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html', // COME BACK TO THIS
      filename: 'index.html'
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
