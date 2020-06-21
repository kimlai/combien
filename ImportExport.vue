<template>
  <div>
    <div class="import-export">
      <article>
        <h2>Export</h2>
        <div>
          <p>Vous pouvez exporter l'ensemble de vos données au format texte.</p>
          <div>
            <a download="export.json" :href="dataURL">Exporter mes données</a>
          </div>
        </div>
      </article>
      <article>
        <h2>Import</h2>
        <div>
          <p>
            Importer ensuite ce fichier dans le navigateur que vous souahitez
            synchroniser.
          </p>
          <form v-on:submit.prevent="submitForm">
            <label for="file">Importer un fichier</label>
            <input id="file" type="file" required />
            <button type="submit">Importer mes données</button>
          </form>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import store from "./store";
export default {
  computed: {
    dataURL() {
      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(store.counters)
      )}`;
    }
  },
  methods: {
    submitForm: async function(event) {
      const file = document.getElementById("file").files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result);
        const counters = json.map(counter => ({
          name: counter.name,
          events: counter.events.map(event => ({ date: new Date(event.date) }))
        }));
        store.setCounters(counters);
      };
      reader.readAsText(file);
    }
  }
};
</script>
