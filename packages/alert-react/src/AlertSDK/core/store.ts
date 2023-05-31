import { AlertOptionsProps } from "./types";

const AlertStore: {
  options: AlertOptionsProps;
} = {
  // 默认 options
  options: {
    project: "alert",
    version: "1.0.0",
    env: "test",
    baseUrl: "http://localhost:3200",
  },
};

export default AlertStore;
