const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  output: {
    // chunkhash根据入口文件进行依赖解析
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      // chunks: 'async',
      // minSize: 20000,
      // minRemainingSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 30,
      // maxInitialRequests: 30,
      // enforceSizeThreshold: 50000,
      cacheGroups: {
        // 提取公共资源
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        // common: {
        //   name: 'commons',
        //   chunks: 'all',
        //   minChunks: 2
        // },
      },
    },
  },
  devtool: false,
  stats: 'errors-only',
};

module.exports = merge(base, config);
