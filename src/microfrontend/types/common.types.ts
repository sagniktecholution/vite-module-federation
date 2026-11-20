export interface IMicroFrontendApi {
  dispatch<T>(eventName: string, payload: T): void;
  subscribe<T>(eventName: string, handler: (payload: T) => void): () => void;
  unsubscribe<T>(eventName: string, handler: (payload: T) => void): void;
}

declare global {
  interface Window {
    hostMicroFrontendApi: IMicroFrontendApi;
    remoteMicroFrontendApi: IMicroFrontendApi;
  }
}