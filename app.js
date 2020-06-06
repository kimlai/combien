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
    onDay: function(events, daysOffset) {
      return events.filter(event => {
        const day = new Date();
        day.setDate(day.getDate() + daysOffset);
        return (
          day.getFullYear() === event.date.getFullYear() &&
          day.getMonth() === event.date.getMonth() &&
          day.getDate() === event.date.getDate()
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
