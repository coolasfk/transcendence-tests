import Match from '../domain/entities/Match.js'


export default class EventBus {
    constructor() {
      this.subscribers = {}; //// this is an INTERNAL EVENT REGISTRY
    }
  
    subscribe(event, callback) {
      if (!this.subscribers[event]) this.subscribers[event] = [];
      this.subscribers[event].push(callback);
    }
  
    publish(event, payload) {
      if (this.subscribers[event]) {
        for (const cb of this.subscribers[event]) {
          cb(payload);
        }
      }
    }
  }
  