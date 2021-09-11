import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const currentTrackVar = makeVar();
const tracklistVar = makeVar();
const userVar = makeVar({ name: null, isLoggedOut: false });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentTrack: {
          read() {
            return currentTrackVar();
          }
        },
        tracklist: {
          read() {
            return tracklistVar();
          }
        },
        user: {
          read() {
            return userVar();
          }
        }
      }
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  return {
    credentials: 'include'
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache
})

export {
  client,
  currentTrackVar,
  tracklistVar,
  userVar
}