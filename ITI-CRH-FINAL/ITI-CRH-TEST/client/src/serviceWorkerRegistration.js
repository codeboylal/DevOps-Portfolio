import { Workbox } from "workbox-window";

export function register() {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/service-worker.js");

    wb.addEventListener("waiting", () => {
      if (window.confirm("New version available! Refresh now?")) {
        wb.addEventListener("controlling", () => {
          navigator.serviceWorker.controller.postMessage({ type: "CLEAR_CACHE" });
          window.location.reload();
        });
        wb.messageSW({ type: "SKIP_WAITING" });
      }
    });

    wb.register();
  }
}
