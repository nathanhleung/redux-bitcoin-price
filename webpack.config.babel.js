import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const fontLoaders = [
  { test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url' },
];

const config = {
  entry: [
    'babel-polyfill', // for async await
    path.join(__dirname, 'src', 'entry.js'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      ...fontLoaders,
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css', 'sass']),
      },
      {
        test: /\.jade$/, // so that our IDE automatically detects Jade highlighting
        loaders: ['jade'],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlPlugin({
      template: path.join(__dirname, 'src', 'index.jade'),
    }),
  ],
};

export default config;