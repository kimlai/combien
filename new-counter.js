import "regenerator-runtime/runtime"; // async/await support using babel
import { get, set } from "idb-keyval";

document.getElementById("form").addEventListener("submit", async event => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const counters = (await get("counters")) || [];
  set("counters", counters.concat(name));
  window.location = "/";
});
