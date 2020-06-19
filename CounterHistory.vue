<template>
  <section class="counter-history">
    <h1>{{ counter.name }}</h1>
    <div>
      <div class="month">
        <button v-on:click="backward">◀️</button>
        <div class="month-name">
          {{ monthName(month) }}
          {{ year }}
        </div>
        <button v-on:click="forward">▶️</button>
      </div>
      <table class="daily-stats">
        <thead>
          <tr>
            <th
              class="day-header"
              v-for="day in ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in groupByWeeks(dailyStats())">
            <td v-for="count in week">
              {{ count }}
            </td>
          </tr>
        </tbody>
      </table>
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
  props: ["now"],
  data() {
    return {
      counter: {
        name: "",
        events: []
      },
      month: getLast5am(this.now).getMonth(),
      year: getLast5am(this.now).getFullYear()
    };
  },
  mounted: function() {
    this.counter = store.getCounter(this.$route.params.name);
  },
  methods: {
    backward() {
      if (this.month === 0) {
        this.year = this.year - 1;
      }
      this.month = (12 + this.month - 1) % 12;
    },
    forward() {
      if (this.month === 11) {
        this.year = this.year + 1;
      }
      this.month = (this.month + 1) % 12;
    },
    dailyStats() {
      const events = this.counter.events;
      const firstDayOfMonth = new Date(this.year, this.month, 1);
      const lastDayOfMonth = new Date(this.year, this.month + 1, 0);
      const now = new Date();
      const res = range(1, lastDayOfMonth.getDate()).map(dayOfMonth => {
        const day = new Date(this.year, this.month, dayOfMonth);
        const start = new Date(day);
        start.setHours(5);
        start.setMinutes(0);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        if (start >= now) {
          return null;
        }
        return events.filter(event => start < event.date && event.date <= end)
          .length;
      });
      const padding = new Array((firstDayOfMonth.getDay() + 6) % 7);
      return padding.concat(res);
    },
    monthName(month) {
      return [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
      ][month];
    },
    groupByWeeks(stats) {
      if (stats.length <= 7) {
        return [stats];
      }
      return [stats.slice(0, 7)].concat(this.groupByWeeks(stats.slice(7)));
    }
  }
};
</script>
