import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar
} from '@apollo/client';

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

const client = new ApolloClient({
  link: httpLink,
  cache: cache
})

export {
  client,
  currentTrackVar,
  //  trackListVar
}