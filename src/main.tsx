import ReactDOM from "react-dom/client";
//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
//layout
import AppLayout from "@routes/AppLayout";
//redux
import { store, persistor } from "@store";
//axios
import "./services/axios-global.js";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppLayout />
    </PersistGate>
  </Provider>
);