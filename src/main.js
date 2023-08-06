import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "@/router/index";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  //注册路由
  router,
  render: (h) => h(App),
}).$mount("#app");
