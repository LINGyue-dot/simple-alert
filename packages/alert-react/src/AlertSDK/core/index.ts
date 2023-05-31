import initListener from "./listener";
import AlertStore from "./store";
import { AlertOptionsProps } from "./types";

const AlertSdk = {
  init(options: AlertOptionsProps) {
    // dev 下不上报
    if (process.env.NODE_ENV === "development") {
      return;
    }
    AlertStore.options = options;
    initListener();
  },
};

export default AlertSdk;
