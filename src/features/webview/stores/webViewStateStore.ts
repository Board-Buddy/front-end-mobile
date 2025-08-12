import { create } from "zustand";

interface WebViewStates {
  [stateKey: string]: unknown;
}

export interface WebViewStateStore {
  webViewStates: WebViewStates;
  setWebViewState: (key: string, value: unknown) => void;
  getWebViewState: (key: string) => unknown | undefined;
  clearWebViewState: (key: string) => void;
}

export const useWebViewStateStore = create<WebViewStateStore>((set, get) => ({
  webViewStates: {},

  setWebViewState: (key, value) =>
    set((state) => ({
      webViewStates: {
        ...state.webViewStates,
        [key]: value,
      },
    })),

  getWebViewState: (key) => get().webViewStates[key],

  clearWebViewState: (key) =>
    set((state) => {
      const { [key]: _, ...rest } = state.webViewStates;
      return { webViewStates: rest };
    }),
}));
