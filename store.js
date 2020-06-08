import { get, set } from "idb-keyval";

const counters = [];

const initialize = async () => {
  const storedCounters = (await get("counters")) || [];
  storedCounters.forEach(async counter => {
    const events = (await get(counter)) || [];
    counters.push({ name: counter, events: events });
  });
};

const add = async name => {
  const storedCounters = (await get("counters")) || [];
  return set("counters", storedCounters.concat(name)).then(() => {
    counters.push({ name, events: [] });
    return counters;
  });
};

const increment = name => {
  const counter = counters.filter(counter => counter.name === name)[0];
  counter.events.push({ date: new Date() });
  return set(name, counter.events);
};

export default {
  counters,
  initialize,
  add,
  increment
};
