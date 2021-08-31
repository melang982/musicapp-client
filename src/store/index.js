import { createStore } from 'redux'

const initialState = {
  currentTrack: null
};

const reducer = (state = initialState, action) => {

  if (action.type === 'SET_TRACK') {
    return Object.assign({}, state, {
       currentTrack: action.payload
     })
 }

  return state;
}

const store = createStore(reducer);

export default store;
