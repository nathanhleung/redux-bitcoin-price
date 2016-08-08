import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const fontLoaders = [
  { test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url' },
];

const config = {
  entry: [
    // babel-polyfill is loaded via CDN, see https://phabricator.babeljs.io/T7348
    'whatwg-fetch', // for Safari and IE
    path.join(__dirname, 'src', 'entry'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      ...fontLoaders,
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
      },
      {
        test: /\.css$/,
        // see https://github.com/postcss/postcss-loader for query param info
        loader: ExtractTextPlugin.extract(['css?modules&importLoaders=1', 'postcss']),
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
  postcss() {
    return [precss, autoprefixer];
  }
};

export default config;