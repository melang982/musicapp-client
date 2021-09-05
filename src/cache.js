import {
  InMemoryCache,
  makeVar
} from '@apollo/client';

export const currentTrackVar = makeVar();

export const cache = new InMemoryCache({
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