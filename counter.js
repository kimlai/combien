export default Vue.component("counter", {
  props: ["name", "events"],
  template: `
    <div class="counter">
      <button class="counter-button" v-on:click="increment">
        <div>➕</div>
        <div class="counter-name">{{ name }}</div>
      </button>
      <div class="stats">
        <div>aujourd'hui: {{ onDay(0) }}</div>
        <div>cette semaine: {{ thisWeek() }}</div>
      </div>
    </div>
  `,
  methods: {
    increment: async function() {
      const name = this.props.name;
      const events = (await get(name)) || [];
      const newCounter = this.counters[name].concat({ date: new Date() });
      this.counters[name] = newCounter;
      return set(name, newCounter);
    },
    onDay: function(daysOffset) {
      const events = this.props.events;
      const day = new Date();
      day.setDate(day.getDate() + daysOffset);
      return events.filter(event => {
        // remove 5h to the event date to consider all events happening
        // between midnight and 5am as events of the previous day.
        const eventDate = new Date(event.date); // do not mutate the original event
        eventDate.setHours(eventDate.getHours() - 5);
        return (
          day.getFullYear() === eventDate.getFullYear() &&
          day.getMonth() === eventDate.getMonth() &&
          day.getDate() === eventDate.getDate()
        );
      }).length;
    },
    thisWeek: function() {
      const events = this.props.events;
      const lastMonday = new Date();
      lastMonday.setDate(
        lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7)
      );
      return events.filter(event => {
        // remove 5h to the event date to consider all events happening
        // between midnight and 5am as events of the previous day.
        const eventDate = new Date(event.date); // do not mutate the original event
        eventDate.setHours(eventDate.getHours() - 5);
        return lastMonday <= eventDate;
      }).length;
    }
  }
});
