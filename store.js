import { get, set } from "idb-keyval";

let counters = [];

const initialize = async () => {
  const storedCounters = (await get("counters")) || [];
  return Promise.all(
    storedCounters.map(async counter => {
      const events = (await get(counter)) || [];
      counters.push({ name: counter, events: events });
    })
  );
};

const add = async name => {
  const storedCounters = (await get("counters")) || [];
  return set("counters", storedCounters.concat(name)).then(() => {
    counters.push({ name, events: [] });
    return counters;
  });
};

const getCounter = name => counters.filter(counter => counter.name === name)[0];

const increment = name => {
  const counter = getCounter(name);
  counter.events.push({ date: new Date() });
  return set(name, counter.events);
};

const setCounters = newCounters => {
  counters = newCounters;
  set(
    "counters",
    counters.map(counter => counter.name)
  );
  counters.forEach(counter => {
    set(counter.name, counter.events);
  });
};

export default {
  counters,
  initialize,
  add,
  increment,
  getCounter,
  setCounters
};
