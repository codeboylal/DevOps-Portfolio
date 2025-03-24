import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

ReactDOM.render(
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_OAUTH_CLIENT_ID">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
