import Fuse from 'fuse.js';
const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "https://rappamappa.herokuapp.com";
const LOAD_ALL = "rappamappa/rappers/LOAD_ALL";
const SET_ACTIVE = "rappamappa/rappers/SET_ACTIVE";
const SET_INACTIVE = "rappamappa/rappers/SET_INACTIVE";
const SET_SEARCH_ACTIVE = "rappamappa/rappers/SET_SEARCH_ACTIVE";
const LOAD_ADDITIONAL_INFO = "rappamappa/rappers/LOAD_ADDITIONAL_INFO";


export const loadAll = rappers => ({type: LOAD_ALL, rappers});
export const activate = rapper => ({type: SET_ACTIVE, rapper});
export const deactivate = () => ({type: SET_INACTIVE, rapper: null });
export const activateSearchResult = rapper => ({type: SET_SEARCH_ACTIVE, rapper});
export const additionalInfo = rapper => ({type: LOAD_ADDITIONAL_INFO, rapper});

let fuseSearch; 
export const getRappers = () => async dispatch =>{
    const data = await fetch(`${backendUrl}/artists/`);
    const {allArtists} = await data.json();
    
    //set search function when all artists received 
    fuseSearch = new Fuse(allArtists, {keys: ['fields.name']});

    dispatch(loadAll(allArtists));
}
export const setActiveRapper = (recordid) => async (dispatch, getState) =>{
    const {rappers: {rappers} } = getState();
    const rapper = rappers.find((rapper) => rapper.recordid === recordid);
    dispatch(activate(rapper));
}
export const noActiveRapper = () => async dispatch =>{
    dispatch(deactivate());
}


export const setSearchActive = queryName => async (dispatch, getState) =>{
    const {rappers: {rappers} } = getState();
    const results = fuseSearch.search(queryName);

    if (results.length){
        const rapper = results[0].item;
        dispatch(activateSearchResult(rapper));
        return true;
    } return false;
}

export const loadAdditionalInfo = rapper => async dispatch => {
    const name = rapper.fields.name;
    try{
        const data = await fetch(`${backendUrl}/spotify/more-info/${name}`)
        const json = await data.json();
        const {artistInfo} = json;
        rapper.additionalInfo = artistInfo;
        dispatch(additionalInfo(rapper));
    } catch(err) { console.error("OH SNAP", err)}
    
}

export default function reducer(state = {}, action) {
  Object.freeze(state);
  switch(action.type){
      case LOAD_ALL: {
          const newState = {...state};
          newState.rappers = action.rappers;
          return {
            ...state,
            rappers: action.rappers
          }
      } case SET_ACTIVE:{
          const newState = {...state};
          newState.activeRapper = action.rapper;
          newState.refocusLocation = {
            lat: action.rapper.fields.location_coordinates[0],
            lng: action.rapper.fields.location_coordinates[1],
          };
          return newState;
      } case SET_INACTIVE:{
          const newState = { ...state };
          newState.activeRapper = null;
          return newState
      } case SET_SEARCH_ACTIVE: {
          const newState = {...state};
          newState.activeRapper = action.rapper;
          newState.refocusLocation = {
              lat: action.rapper.fields.location_coordinates[0],
              lng: action.rapper.fields.location_coordinates[1],
          }
          return newState;
      } case LOAD_ADDITIONAL_INFO: {
        const newState = {...state}
        newState.activeRapper = action.rapper;
        return newState;
      } default: return state;
  }
}
