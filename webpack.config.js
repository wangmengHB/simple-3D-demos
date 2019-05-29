const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// different entry path for different npm cmd
const CUSTOM = '--custom';
const DEMO = 'demo';

let demoNum = 10;

const args = process.argv;
const index = args.indexOf(CUSTOM);

if (index > - 1 && index + 1 < args.length) {
  const arg = args[index + 1];
  const str = arg.substring(DEMO.length);
  const num = parseInt(str);
  if (!isNaN(num) && isFinite(num)) {
    demoNum = num;
  }
}

const entryPath = `./src/demo/${DEMO}${demoNum}/index.js`;

module.exports = {
    mode: 'development',
    watch: true,
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    context: path.resolve(__dirname),
    entry: {
      app: path.join(__dirname, entryPath)
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ]
        },
        {
          test: /\.(jpg|png)$/,
          use: 'file-loader',
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '3D sample',
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'none',
    devServer: {
      clientLogLevel: 'warning',
      hot: true,
      contentBase: false, 
      compress: true,
      host: 'localhost',
      port: 8080,
      open: true,
      overlay: { 
        warnings: false, 
        errors: true 
      }
    },
}