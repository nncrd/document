module.exports = {
  devServer: {
      port: 9030,
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
