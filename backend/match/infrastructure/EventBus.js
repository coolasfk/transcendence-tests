


export default class EventBus {
    constructor() {
      this.subscribers = {}; //// this is an INTERNAL EVENT REGISTRY
    }
  
    subscribe(event, callback) {
      console.log("subscribing to events");
      if (!this.subscribers[event]) 
      {
        this.subscribers[event] = [];
      }
      this.subscribers[event].push(callback);
    }
  
    publish(event, payload) {
      console.log("publishing events");
      if (this.subscribers[event]) {
        for (const cb of this.subscribers[event]) {
          cb(payload);
        }
      }
    }
  }
  