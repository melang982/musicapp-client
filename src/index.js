import React from 'react';
import ReactDOM from 'react-dom';

import {
  Provider
} from 'react-redux'
import store from './store'
//window.store = store

import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render( < Provider store = {
    store
  } >
  <
  ApolloProvider client = {
    client
  } >
  <
  App / >
  <
  /ApolloProvider> < /
  Provider > , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();