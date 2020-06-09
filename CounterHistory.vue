<template>
  <section class="counter-history">
    <h1>{{ counter.name }}</h1>
    <div>
      <ul class="daily-stats">
        <li
          class="day-header"
          v-for="day in [
            'Lun',
            'Mar',
            'Mer',
            'Jeu',
            'Ven',
            'Sam',
            'Dim'
          ].reverse()"
        >
          {{ day }}
        </li>
        <li v-for="(stat, index) in dailyStats()" :key="index">
          {{ stat }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import store from "./store";

const range = (a, b) => {
  const res = [];
  for (let i = a; i <= b; i++) {
    res.push(i);
  }
  return res;
};

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
      const padding = new Array(7 - getLast5am(now).getDay());
      const res = range(0, 28 - (padding.length + 1)).map(offset => {
        const day = new Date(now);
        day.setDate(day.getDate() - offset);
        const start = getLast5am(day);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        return events.filter(event => start < event.date && event.date <= end)
          .length;
      });
      return padding.concat(res);
    }
  }
};
</script>
