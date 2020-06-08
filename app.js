import "regenerator-runtime/runtime"; // async/await support using babel
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./Home.vue";
import NewCounter from "./NewCounter.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/new-counter", component: NewCounter }
  ]
});

new Vue({ router }).$mount("#app");
