const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/moire-vue/",
});

// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/my-project/" : "/",
// };
