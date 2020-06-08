<template>
  <form v-on:submit.prevent="submitForm">
    <label for="name">Nom du compteur</label>
    <input v-model="name" id="name" type="text" />
    <button type="submit">Valider</button>
  </form>
</template>

<script>
import store from "./store";

export default {
  data: () => ({ name: "" }),
  methods: {
    submitForm: async function(event) {
      const name = document.getElementById("name").value;
      store.add(name).then(() => this.$router.push("/"));
    }
  }
};
</script>
