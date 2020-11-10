module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8080
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8080",
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  }
};
