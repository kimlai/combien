import {
  get,
  set
} from "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs";

document.getElementById("form").addEventListener("submit", async event => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const counters = (await get("counters")) || [];
  set("counters", counters.concat(name));
  window.location = "/";
});
