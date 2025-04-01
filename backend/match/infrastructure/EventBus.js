class EventBus {
  constructor() {
    if (!EventBus.instance) {
      this.subscribers = {};
      EventBus.instance = this;
    }

    return EventBus.instance;
  }

  subscribe(event, callback) {
    console.log("subscribing to events");
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  publish(event, payload) {
    console.log("publishing events", event);
    if (this.subscribers[event]) {
      for (const cb of this.subscribers[event]) {
        cb(payload);
      }
    }
  }
}

const instance = new EventBus(); // this is the shared singleton
Object.freeze(instance);         // freeze to prevent changes

export default instance;
