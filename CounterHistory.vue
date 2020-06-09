<template>
  <section class="counter-history">
    <h1>{{ counter.name }}</h1>
    <h2>7 derniers jours</h2>
    <div>
      <ul class="daily-stats">
        <li v-for="(stat, index) in dailyStats()" :key="index">
          {{ stat }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import store from "./store";

const getLast5am = now => {
  const date = new Date(now);
  if (date.getHours() < 5) {
    date.setDate(date.getDate() - 1);
  }
  date.setHours(5);
  date.setMinutes(0);
  return date;
};

export default {
  data: () => ({
    counter: {
      name: "",
      events: []
    }
  }),
  mounted: function() {
    this.counter = store.getCounter(this.$route.params.name);
  },
  methods: {
    dailyStats() {
      const events = this.counter.events;
      const now = new Date();
      const res = [6, 5, 4, 3, 2, 1, 0].map(offset => {
        const day = new Date(now);
        day.setDate(day.getDate() - offset);
        const start = getLast5am(day);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        return events.filter(event => start < event.date && event.date <= end)
          .length;
      });
      return res;
    }
  }
};
</script>
