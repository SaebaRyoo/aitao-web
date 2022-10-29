const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const config = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 关闭类型检查，即只进行转译
              // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
              transpileOnly: true,
            },
          },
        ],
        // loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash:8][ext][query]',
        },
        // use: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        // 使用资源模块
        type: 'asset',
        generator: {
          filename: 'imgs/[hash:8][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       // 文件内容的hash,md5生成
        //       name: 'img/[name].[hash:8].[ext]',
        //       limit: 10240,
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
    // css提取
    new MiniCssExtractPlugin({
      filename: `css/[name].[contenthash:8].css`,
    }),
    // 代码体积分析
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    // 控制台信息
    new FriendlyErrorsWebpackPlugin(),
    // 将预编译的公共库导入到html中
    // new AddAssetHtmlPlugin({ filepath: require.resolve('./dll/react.dll.js') }),
    // // webpack4之后dllPlugin对性能的提升就不大了
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   // manifest.json就是对我们要引入包的描述
    //   manifest: require('./dll/manifest.json'),
    // }),

    // fork 一个进程进行ts类型检查 // 项目的规模越大，提速越明显
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@/src': path.resolve(__dirname, 'src'),
      '@/public': path.resolve(__dirname, 'public'),
      '@/config': path.resolve(__dirname, 'config'),
    },
  },
};

module.exports = config;
