import { EventData, EventHandler, EventTypes } from './types';

const listeners = {} as Record<EventTypes, EventHandler<EventTypes>[]>;
const eventSystem = {
  emit<T extends EventTypes>(event: T, data: EventData[T]): void {
    const handlers = listeners[event];
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  },

  on<T extends EventTypes>(event: T, handler: EventHandler<T>): void {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(handler as EventHandler<EventTypes>);
  },

  off<T extends EventTypes>(event: T, handler: EventHandler<T>): void {
    const handlers = listeners[event];
    if (handlers) {
      listeners[event] = handlers.filter(
        (h) => h !== handler,
      ) as EventHandler<EventTypes>[];
    }
  },
};

export default eventSystem;
