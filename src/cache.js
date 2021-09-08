import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';

const currentTrackVar = makeVar();
//const trackListVar = makeVar();

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentTrack: {
          read() {
            return currentTrackVar();
          }
        }
      }
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache
})

export {
  client,
  currentTrackVar,
  //  trackListVar
}