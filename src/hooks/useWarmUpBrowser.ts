import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

// This hook is used to warm up the browser before the user needs to use it. PRIMARILY FOR ANDROID

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
