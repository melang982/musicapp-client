import { useState, useRef, useEffect } from 'react';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import Icon from './Icon';
import AlbumCover from './AlbumCover';
import '../styles/search.scss';

const PLAYLIST_QUERY = gql `
  query GetPlaylist($id: Int!) {
      playlist(id: $id) {
      tracks {
        id
      }
    }
  }
`;

const SEARCH_QUERY = gql `
  query SearchTracksQuery($filter: String!) {
    tracks(filter: $filter) {
      id
      title
      album {
        id
      }
    }
  }
`;

const ADD_TO_PLAYLIST_MUTATION = gql `
  mutation AddToPlaylist($playlistId: Int!, $trackId: Int!) {
    addToPlaylist(playlistId: $playlistId, trackId: $trackId)
  }
`;

function PlaylistSearch({ location, playlistId }) {

  const [searchString, setSearchString] = useState('');
  const [executeSearch, { data }] = useLazyQuery(SEARCH_QUERY);

  const wrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSearchString('');
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    setSearchString('');
  }, [location]);

  function onSearch(str) {
    if (str) {
      executeSearch({
        variables: {
          filter: str
        }
      })
    };

    setIsVisible(true);
    setSearchString(str);
  };

  const [addToPlaylist] = useMutation(ADD_TO_PLAYLIST_MUTATION);

  function onClick(track) {
    addToPlaylist({
      variables: { playlistId: playlistId, trackId: parseInt(track.id) },
      update: (cache, mutationResult) => {
        const { playlist } = cache.readQuery({
          query: PLAYLIST_QUERY,
          variables: { id: playlistId }
        });

        const updatedTracks = playlist.tracks.filter(function(obj) {
          return obj.id !== track.id;
        });

        cache.writeQuery({
          query: PLAYLIST_QUERY,
          variables: { id: playlistId },
          data: {
            playlist: {
              tracks: updatedTracks
            }
          }
        });
      }
    });
  }

  return <div ref={wrapperRef} className="search">
    <Icon icon='search'/>

    <input type="text" value={searchString} placeholder="Type here to search" onInput={(e) => onSearch(e.target.value)}/> {
      isVisible && searchString && data && <div className="search__results">
          { data.tracks.length > 0 && <h5>Tracks</h5>}
          {
            data.tracks.map((track) => <div key={track.id} className="search__track" onClick={() => onClick(track)}>
                <AlbumCover id={track.album.id} />
                {track.title}
              </div>)
          }
        </div>
}
</div>;

}
export default withRouter(PlaylistSearch);