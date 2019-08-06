const path = require('path');
// eslint-disable-next-line node/no-unpublished-require
const nodeExternals = require('webpack-node-externals');

const mode = process.env.WEBPACK_BUILD_MODE || 'development';

module.exports = [
  /* Client side */
  {
    mode,
    target: 'web',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name]',
    },
    entry: {
      'js/main.bundle.js': path.resolve(__dirname, 'src/client/index.tsx'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          exclude: /(node_modules|dist)/,
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
        {
          test: /(\.ts$|\.tsx$)/,
          loader: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [],
  },

  /* Server side */
  {
    mode,
    target: 'node',
    devtool: 'source-map',
    externals: [nodeExternals()],
    entry: {
      'main.bundle.js': path.resolve(__dirname, 'src/server/index.ts'),
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name]',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          exclude: /(node_modules|dist)/,
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
            emitError: true,
          },
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [],
  },
];
