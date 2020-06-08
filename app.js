import Vue from "https://unpkg.com/vue@2.6.0/dist/vue.esm.browser.js";
import {
  get,
  set
} from "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs";

const getLast5am = () => {
  const date = new Date();
  if (date.getHours() < 5) {
    date.setDate(date.getDate() - 1);
  }
  date.setHours(5);
  return date;
};

const getLastMonday5am = () => {
  const date = new Date();
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  date.setHours(5);
  date.setMinutes(0);
  return date;
};

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
        <div>aujourd'hui: {{ today() }}</div>
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
    today: function() {
      const events = this.counter.events;
      // we count events happening between 00:00 and 5am as yesterday events.
      const last5am = getLast5am();
      return events.filter(event => last5am <= event.date).length;
    },
    thisWeek: function() {
      const events = this.counter.events;
      // we count events happening Monday between 00:00 and 5am as Sunday events.
      const lastMonday5am = getLastMonday5am();
      return events.filter(event => lastMonday5am <= event.date).length;
    }
  }
});

const initialize = () => {
  const vm = new Vue({
    el: "#app",
    data: { counters: [] }
  });
  get("counters").then(idbCounters => {
    (idbCounters || []).forEach(async counter => {
      const events = (await get(counter)) || [];
      vm.counters.push({ name: counter, events: events });
    });
  });
};

initialize();
