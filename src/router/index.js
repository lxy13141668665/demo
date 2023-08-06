//1.导入VueRouter
import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由组件
import Home from "@/pages/Home";
//2.使用路由
Vue.use(VueRouter);
// 把VueRouter原型对象push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//3.创建VueRouter的实例
const router = new VueRouter({
  //tips:不想要 #（锚点）就添加下面代码
  mode: "history",
  //4.配置路由的path和组件
  routes: [
    {
      path: "/home",
      component: Home,
      meta: { show: true },
    },
    {
      path: "*",
      redirect: "/home",
    },
  ],
});
//5.导入路由实例
export default router;
