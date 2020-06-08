<template>
  <div class="home">
    <ul class="counters">
      <Counter
        v-for="counter in counters"
        v-bind:key="counter.name"
        v-bind:counter="counter"
      ></Counter>
    </ul>
    <router-link to="/new-counter" class="new-counter-link">
      nouveau compteur
    </router-link>
  </div>
</template>

<script>
import { get, set } from "idb-keyval";
import Counter from "./Counter.vue";

export default {
  data: () => ({ counters: [] }),
  components: { Counter },
  mounted: async function() {
    const counters = (await get("counters")) || [];
    counters.forEach(async counter => {
      const events = (await get(counter)) || [];
      this.counters.push({ name: counter, events: events });
    });
  }
};
</script>
