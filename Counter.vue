<template>
  <div class="counter">
    <div class="counter-button">
      <button v-on:click="increment">
        <div>➕</div>
        <div class="counter-name">{{ counter.name }}</div>
      </button>
      <transition name="slideUp" v-on:after-enter="incrementing = false">
        <div v-if="incrementing" class="incrementing">+1</div>
      </transition>
    </div>
    <div class="stats">
      <div>aujourd'hui: {{ today() }}</div>
      <div>cette semaine: {{ thisWeek() }}</div>
      <div>
        <router-link
          :to="{ name: 'counterHistory', params: { name: counter.name } }"
        >
          voir l'historique
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./store";

const getLast5am = now => {
  const date = new Date(now);
  if (date.getHours() < 5) {
    date.setDate(date.getDate() - 1);
  }
  date.setHours(5);
  return date;
};

const getLastMonday5am = now => {
  const date = new Date(now);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  date.setHours(5);
  date.setMinutes(0);
  return date;
};

export default {
  props: ["counter", "now"],
  data: () => ({ incrementing: false }),
  methods: {
    increment: function() {
      store.increment(this.counter.name).then(() => (this.incrementing = true));
    },
    today: function() {
      const events = this.counter.events;
      // we count events happening between 00:00 and 5am as yesterday events.
      const last5am = getLast5am(this.now);
      return events.filter(event => last5am <= event.date).length;
    },
    thisWeek: function() {
      const events = this.counter.events;
      // we count events happening Monday between 00:00 and 5am as Sunday events.
      const lastMonday5am = getLastMonday5am(this.now);
      return events.filter(event => lastMonday5am <= event.date).length;
    }
  }
};
</script>
