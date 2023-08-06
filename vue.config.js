const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        pathRewrite: { "^/api": "" }, //路径改写
      },
    },
  },
});
// axios.get('http://localhost:8080/api/student/1')
// .then(function (response) {
//     // handle success
//     console.log(response);
// })
// .catch(function (error) {
//     // handle error
//     console.log(error);
// })
// .then(function () {
//     // always executed
// });
