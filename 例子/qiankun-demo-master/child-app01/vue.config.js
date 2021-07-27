module.exports = {
  devServer: {
      port: 9010,
      headers: {
          'Access-Control-Allow-Origin': '*'
      }
  },
  configureWebpack: {
      output: {
          library: 'child',
          libraryTarget: 'umd'
      }
  }
};
