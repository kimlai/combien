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
      const day = new Date();
      day.setDate(day.getDate() + daysOffset);
      return events.filter(event => {
        // remove 5h to the event date to consider all events happening
        // between midnight and 5am as events of the previous day.
        const eventDate = new Date(event.date); // do not mutate the original event
        eventDate.setHours(eventDate.getHours() - 5);
        return (
          day.getFullYear() === eventDate.getFullYear() &&
          day.getMonth() === eventDate.getMonth() &&
          day.getDate() === eventDate.getDate()
        );
      }).length;
    },
    thisWeek: function(events) {
      const lastMonday = new Date();
      lastMonday.setDate(
        lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7)
      );
      return events.filter(event => {
        // remove 5h to the event date to consider all events happening
        // between midnight and 5am as events of the previous day.
        const eventDate = new Date(event.date); // do not mutate the original event
        eventDate.setHours(eventDate.getHours() - 5);
        return lastMonday <= eventDate;
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
