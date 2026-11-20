import type { IMicroFrontendApi } from "./types/common.types";


interface HostMicroFrontendManager extends IMicroFrontendApi {
  setRemoteLoaded: (loaded: boolean) => void;
  isRemoteLoaded: () => boolean;
}

export const createHostMicroFrontendManager = (): HostMicroFrontendManager => {
  const eventHandlers: Map<string, Set<(data: unknown) => void>> = new Map();
  let remoteLoaded = false;

  const api: HostMicroFrontendManager = {
    dispatch(eventName: string, payload: unknown) {
      console.log('[Host] Dispatching event:', eventName, payload);
      if (!remoteLoaded) {
        console.warn('[Host] Remote component not yet loaded. Cannot dispatch event.');
        return;
      }
      const handlers = eventHandlers.get(eventName);
      if (handlers) {
        handlers.forEach(handler => handler(payload));
      }
    },

    subscribe<T>(eventName: string, handler: (payload: T) => void) {
      if (!remoteLoaded) {
        console.warn('[Host] Remote component not yet loaded. Subscription will be pending.');
      }
      
      if (!eventHandlers.has(eventName)) {
        eventHandlers.set(eventName, new Set());
      }
      const handlers = eventHandlers.get(eventName);
      handlers?.add(handler as (data: unknown) => void);
      console.log('[Host] Subscribed to event:', eventName);
      
      return () => this.unsubscribe(eventName, handler);
    },

    unsubscribe<T>(eventName: string, handler: (payload: T) => void) {
      const handlers = eventHandlers.get(eventName);
      if (handlers) {
        handlers.delete(handler as (data: unknown) => void);
        if (handlers.size === 0) {
          eventHandlers.delete(eventName);
        }
      }
    },

    setRemoteLoaded(loaded: boolean) {
      remoteLoaded = loaded;
      console.log('[Host] Remote component loaded status:', loaded);
    },

    isRemoteLoaded() {
      return remoteLoaded;
    }
  };

  return api;
};