const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 制定需要分离的包
    library: ['react', 'react-dom', 'redux', 'react-redux'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'dll/library'),
    library: '[name]_[fullhash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[fullhash]',
      path: path.join(__dirname, 'dll/library', '[name].json'),
    }),
  ],
  // resolve: {
  //   extensions: ['.js', '.jsx', '.json', '.less', '.css'],
  //   modules: [__dirname, 'node_modules']
  // },
};
