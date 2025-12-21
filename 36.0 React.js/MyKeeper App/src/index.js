import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./contexts/AppContext";

const CLIENT_ID =
  "1023495616931-89jlpav1dk341kmhlajmkeokff2pa7ij.apps.googleusercontent.com";

ReactDOM.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <AppProvider>
      <App />
    </AppProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
