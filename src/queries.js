import { gql } from '@apollo/client';

export const PLAYLIST_QUERY = gql `
    query getPlaylist($id: Int!) {
      playlist(id: $id){
      id
      title
      tracks {
        assignedAt
        track {
          id
          title
          artist {
            id
            name
          }
          album {
            id
            title
            color
          }
          duration
          number
        }
      }
      createdBy {
        id
        name
      }
    }
    }
  `;