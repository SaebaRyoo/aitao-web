const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', '.css'],
    modules: [__dirname, 'node_modules'],
  },
  entry: {
    // 制定需要分离的包
    react: ['react', 'react-dom'],
    redux: ['redux', 'react-redux', '@reduxjs/toolkit'],
    router: ['react-router', 'react-router-dom'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'dll/'),
    library: '[name]_[fullhash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[fullhash]',
      path: path.join(__dirname, 'dll', 'manifest.json'),
    }),
  ],
};
