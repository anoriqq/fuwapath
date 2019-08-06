const path = require('path');
// eslint-disable-next-line node/no-unpublished-require
const nodeExternals = require('webpack-node-externals');

module.exports = [
  /* Client side */
  {
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
          test: /\.(ts|tsx)$/,
          enforce: 'pre',
          exclude: /(node_modules|dist)/,
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules|dist)/,
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
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
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
          exclude: /(node_modules|dist)/,
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
