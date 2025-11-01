import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function Auth({ onLogin }) {
  return (
    <div className="login-page">
      <h2>Welcome to the MyKeeper App</h2>
      <p>Login with your Google account to continue</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          onLogin(credentialResponse);
        }}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default Auth;
