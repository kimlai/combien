import "regenerator-runtime/runtime"; // async/await support using babel
import Vue from "vue";
import store from "./store";
import App from "./App.vue";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}

store.initialize().then(() => {
  new Vue({ render: createElement => createElement(App) }).$mount("#app");
});
