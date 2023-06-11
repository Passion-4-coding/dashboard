import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import { App } from "./App.tsx";
import "./index.css";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "https://2b7544d2b74e4591ba17041fd4de0e7a@o4505233445617664.ingest.sentry.io/4505233500471296",
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
