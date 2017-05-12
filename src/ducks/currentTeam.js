import R from 'ramda'
import slug from 'slug'
import database from '../firebase'

// teams.js

const LOAD   = 'team/LOAD';
const UPDATE = 'team/UPDATE';

const dbTeamsRef = database.ref('teams/')


export default function currentTeam(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return action.currentTeam
    default:
      return state
  }
}

export function loadTeam(teamSlug) {
  return (dispatch) => {
    dbTeamsRef.orderByChild("slug").equalTo(teamSlug).once('value', (snapshot) => {
      let currentTeam = R.values(snapshot.val())[0]
      return dispatch({ type: LOAD, currentTeam })
    })
  }
}

export function updateTeam(team) {
  return { type: UPDATE, team };
}
