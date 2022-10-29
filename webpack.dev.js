const { merge } = require('webpack-merge');
const base = require('./webpack.base');
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// const swp = new SpeedMeasureWebpackPlugin()

//before accelerate: dev bundle time - 6643
//before accelerate: prod bundle time - 12-14s
const config = {
  output: {
    // Cannot use 'contenthash' when hot reloading is enabled.
    filename: 'js/[name].[fullhash].js',
  },
  plugins: [],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: './dist',
      // publicPath: '/',
    },
    proxy: {
      '/api': 'http://127.0.0.1:8001',
    },
    compress: true,
    port: 8080,
  },
  devtool: 'eval-source-map',
  stats: 'errors-warnings',
};

// module.exports = swp.wrap(merge(base, config));
module.exports = merge(base, config);
// module.exports = (env, argv) => {
//   if (argv.hot) {
//     // Cannot use 'contenthash' when hot reloading is enabled.
//     config.output.filename = '[name].[fullhash].js';
//   }

//   return config;
// };
