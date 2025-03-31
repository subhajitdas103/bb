import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="401783322821-fle2i2gvilkhghf52h894v90kldgitsa.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);