const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');
const glob = require('glob');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// const swp = new SpeedMeasureWebpackPlugin()

const PATHS = {
  src: path.join(__dirname, 'src'),
};
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
    // tree shaking 没有用到的样式
    // PurgeCss@5.0.0 - Not a Constructor Error(https://github.com/FullHuman/purgecss/issues/994)，降级到了4.1.3可用
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],
  optimization: {
    // before:12-14s after: 8834ms, 8844ms, 9157
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
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
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true
        // }
        // common: {
        //   name: 'commons',
        //   chunks: 'all',
        //   minChunks: 2
        // },
      },
    },
  },
  devtool: 'eval',
  // stats: 'errors-only',
};

// module.exports = swp.wrap(merge(base, config));
module.exports = merge(base, config);
