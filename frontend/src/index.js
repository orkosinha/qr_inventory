import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { StyledEngineProvider } from '@mui/material/styles';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StyledEngineProvider injectFirst>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StyledEngineProvider>
);