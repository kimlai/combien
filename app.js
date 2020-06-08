import "regenerator-runtime/runtime"; // async/await support using babel
import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Home from "./Home.vue";
import NewCounter from "./NewCounter.vue";
import CounterHistory from "./CounterHistory.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/new-counter", component: NewCounter },
    {
      path: "/counter/:name",
      component: CounterHistory,
      name: "counterHistory"
    }
  ]
});

store.initialize().then(() => {
  new Vue({ router }).$mount("#app");
});
