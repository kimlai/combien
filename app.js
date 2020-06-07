import Vue from "https://unpkg.com/vue@2.6.0/dist/vue.esm.browser.js";
import {
  get,
  set
} from "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs";

const vm = new Vue({
  el: "#app",
  data: { counters: [] }
});

get("counters").then(idbCounters => {
  idbCounters.forEach(async counter => {
    const events = (await get(counter)) || [];
    vm.counters.push({ name: counter, events: events });
  });
});

const counter = Vue.component("counter", {
  props: ["counter"],
  data: () => ({ incrementing: false }),
  template: `
    <div class="counter">
      <button class="counter-button" v-on:click="increment">
        <div>➕</div>
        <div class="counter-name">{{ counter.name }}</div>
        <transition name="slideUp" v-on:after-enter="incrementing = false">
          <div v-if="incrementing" class="incrementing">+1</div>
        </transition>
      </button>
      <div class="stats">
        <div>aujourd'hui: {{ onDay(0) }}</div>
        <div>cette semaine: {{ thisWeek() }}</div>
      </div>
    </div>
  `,
  methods: {
    increment: async function() {
      const name = this.counter.name;
      this.counter.events.push({ date: new Date() });
      return set(name, this.counter.events).then(
        () => (this.incrementing = true)
      );
    },
    onDay: function(daysOffset) {
      const events = this.counter.events;
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
    thisWeek: function() {
      const events = this.counter.events;
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
