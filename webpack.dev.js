const { merge } = require('webpack-merge');
const base = require('./webpack.base');

const config = {
  output: {
    // Cannot use 'contenthash' when hot reloading is enabled.
    filename: '[name].[fullhash].js',
  },
  plugins: [],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: './dist',
      publicPath: '/',
    },
    proxy: {
      '/api': 'http://127.0.0.1:8001',
    },
    compress: true,
    port: 8080,
  },
  devtool: 'eval-source-map',
};

module.exports = merge(base, config);
// module.exports = (env, argv) => {
//   if (argv.hot) {
//     // Cannot use 'contenthash' when hot reloading is enabled.
//     config.output.filename = '[name].[fullhash].js';
//   }

//   return config;
// };
