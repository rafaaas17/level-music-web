import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";
import '@fontsource/mulish';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/callback",
        audience: audience
      }}
    >
      <Provider store= { store }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </StrictMode>,
)
