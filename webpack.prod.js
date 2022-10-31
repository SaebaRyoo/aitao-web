const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');
const glob = require('glob');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// const swp = new SpeedMeasureWebpackPlugin()

const PATHS = {
  src: path.join(__dirname, 'src'),
};
const config = {
  output: {
    // chunkhash根据入口文件进行依赖解析
    filename: 'js/[name].[chunkhash:8].js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
    }),
    // tree shaking 没有用到的样式
    // PurgeCss@5.0.0 - Not a Constructor Error(https://github.com/FullHuman/purgecss/issues/994)，降级到了4.1.3可用
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    // 将预编译的公共库导入到html中
    // new AddAssetHtmlPlugin([
    //   { filepath: require.resolve('./dll/react.dll.js') },
    //   { filepath: require.resolve('./dll/redux.dll.js') },
    //   { filepath: require.resolve('./dll/router.dll.js') },
    // ]),
    // // 引用预编译chunk webpack4之后dllPlugin对性能的提升就不大了
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   // manifest.json就是对我们要引入包的描述
    //   manifest: require('./dll/manifest.json'),
    // }),
  ],
  optimization: {
    // before:12-14s after: 8834ms, 8844ms, 9157
    minimize: true,
    minimizer: [
      // js压缩
      new TerserPlugin({
        terserOptions: {
          compress: {
            reduce_vars: true,
            pure_funcs: ['console.log'],
          },
        },
      }),
      // css压缩
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // 将路由相关的包单独拆出
        router: {
          test: /[\\/]node_modules[\\/](react-router|@remix-run)/,
          name: 'router',
          chunks: 'all',
          priority: 11,
        },
        // 剩余其他react包
        react: {
          test: /[\\/]node_modules[\\/](react)/,
          name: 'react',
          chunks: 'all',
          priority: 10,
        },
        // node_modules中剩余包
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 9,
        },

        // commons: {
        //   name: 'commons',
        //   test: path.resolve(__dirname, 'src/components'),  // can customize your rules
        //   minChunks: 3, //  minimum common number
        //   priority: 5,
        //   reuseExistingChunk: true
        // }
      },
    },
  },
  // 使用cdn来增加浏览器针对同一域名的并发限制，使用externals将这些库排除在bundle外
  // externals: {
  //   react: 'react',
  //   'react-dom': {
  //     commonjs: 'react-dom',
  //     amd: 'react-dom',
  //     root: '_', // 指向全局变量
  //   },
  //   redux: 'redux',
  //   'react-redux': 'react-redux',
  //   'react-router': 'react-router',
  //   'react-router-dom': 'react-router-dom',
  // },
  performance: {
    // 设置所有产物体积阈值
    maxAssetSize: 172 * 1024,
    // 设置 entry 产物体积阈值
    maxEntrypointSize: 244 * 1024,
    // 报错方式，支持 `error` | `warning` | false
    hints: 'warning',
    // 过滤需要监控的文件类型
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
  devtool: 'eval',
  // stats: 'errors-only',
};

// module.exports = swp.wrap(merge(base, config));
module.exports = merge(base, config);
