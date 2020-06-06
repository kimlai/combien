import Vue from "https://unpkg.com/vue@2.6.0/dist/vue.esm.browser.js";
import {
  get,
  set
} from "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs";

const vm = new Vue({
  el: "#app",
  data: {
    counters: {}
  },
  methods: {
    increment: async function(name) {
      const events = (await get(name)) || [];
      const newCounter = this.counters[name].concat({ date: new Date() });
      this.counters[name] = newCounter;
      return set(name, newCounter);
    },
    today: function(events) {
      return events.filter(event => {
        const now = new Date();
        return (
          now.getFullYear() === event.date.getFullYear() &&
          now.getMonth() === event.date.getMonth() &&
          now.getDate() === event.date.getDate()
        );
      }).length;
    }
  }
});

get("counters").then(idbCounters => {
  idbCounters.forEach(async counter => {
    const events = (await get(counter)) || [];
    Vue.set(vm.counters, counter, events);
  });
});
