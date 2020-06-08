<template>
  <h1>{{ counter.name }}</h1>
</template>

<script>
import store from "./store";

export default {
  data: () => ({
    counter: {
      name: "",
      events: []
    }
  }),
  mounted: function() {
    console.log(store);
    this.counter = store.getCounter(this.$route.params.name);
  }
};
</script>
