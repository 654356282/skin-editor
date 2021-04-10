const path = require('path');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');

module.exports = {
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', style: 'css', libraryDirectory: 'es' }],
    ],
  },
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    plugins: [
      new TypedCssModulesPlugin({
        globPattern: 'src/**/*.(scss|less|css)$',
      }),
    ],
  },
};
