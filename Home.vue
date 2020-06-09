<template>
  <div class="home center">
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
import store from "./store";
import Counter from "./Counter.vue";

export default {
  data: () => ({ counters: store.counters }),
  components: { Counter }
};
</script>
