<template>
  <router-view :now="now"></router-view>
</template>
<script>
import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Home from "./Home.vue";
import NewCounter from "./NewCounter.vue";
import CounterHistory from "./CounterHistory.vue";
import ImportExport from "./ImportExport.vue";

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
    },
    { path: "/import-export", component: ImportExport }
  ]
});

export default {
  data: () => ({
    now: new Date()
  }),
  mounted() {
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this.now = new Date();
      }
    });
  },
  router,
  name: "App"
};
</script>
