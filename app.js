import "regenerator-runtime/runtime"; // async/await support using babel
import Vue from "vue";
import App from "./App.vue";

new Vue({ render: createElement => createElement(App) }).$mount("#app");
