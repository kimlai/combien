<template>
  <div class="home">
    <ul class="counters">
      <Counter
        v-for="counter in counters"
        v-bind:key="counter.name"
        v-bind:counter="counter"
      ></Counter>
    </ul>
    <a class="new-counter-link" alt="nouveau compteur" href="/new-counter.html"
      >nouveau compteur</a
    >
  </div>
</template>

<script>
import Vue from "vue";
import { get, set } from "idb-keyval";
import Counter from "./Counter.vue";

export default Vue.extend({
  data: () => ({ counters: [] }),
  components: { Counter },
  mounted: async function() {
    const counters = (await get("counters")) || [];
    counters.forEach(async counter => {
      const events = (await get(counter)) || [];
      this.counters.push({ name: counter, events: events });
    });
  }
});
</script>
