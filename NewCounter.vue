<template>
  <form v-on:submit.prevent="submitForm">
    <label for="name">Nom du compteur</label>
    <input v-model="name" id="name" type="text" />
    <button type="submit">Valider</button>
  </form>
</template>

<script>
import { get, set } from "idb-keyval";

export default {
  data: () => ({ name: "" }),
  methods: {
    submitForm: async function(event) {
      const name = document.getElementById("name").value;
      const counters = (await get("counters")) || [];
      set("counters", counters.concat(name));
      this.$router.push("/");
    }
  }
};
</script>
