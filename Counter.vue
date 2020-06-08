<template>
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
      <div>
        <router-link
          :to="{ name: 'counterHistory', params: { name: counter.name } }"
        >
          historique
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./store";

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

export default {
  props: ["counter"],
  data: () => ({ incrementing: false }),
  methods: {
    increment: function() {
      store.increment(this.counter.name).then(() => (this.incrementing = true));
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
};
</script>
