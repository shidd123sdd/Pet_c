module.exports = {
  publicPath: "/petsys/",
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8082",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
