import R from 'ramda'
import slug from 'slug'
import { selectCurrentProject } from './index'
import database from '../firebase'

// teams.js

const LOAD   = 'teams/LOAD';
const CREATE = 'teams/CREATE';
const UPDATE = 'teams/UPDATE';
const REMOVE = 'teams/REMOVE';

const dbTeamsRef = database.ref('teams/')


export default function teams(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return action.teams
    case CREATE:
      return Object.assign({}, state, action.team)
    // case REMOVE:
    //   return R.remove(R.indexOf(action.team, state), 1, state)
    case UPDATE:
      return Object.assign({}, state, action.team)
    default:
      return state
  }
}


export function loadTeams() {
  return (dispatch, getState) => {
    let currentProject = selectCurrentProject(getState())
    if (currentProject) {
      dbTeamsRef.orderByChild("projectSlug").equalTo(currentProject.slug).once('value', (snapshot) => {
        let teams = snapshot.val()
        dispatch({ type: LOAD, teams })
      })
    }
  }
}

export function createTeam(team) {
  const newTeamsRef = dbTeamsRef.push()
  team.id = newTeamsRef.key
  team.slug = slug(team.name)
  return (dispatch) => {
    newTeamsRef.set(team)
    newTeamsRef.once('value', (snapshot) => {
      let team = {[snapshot.val().id] : snapshot.val()}
      dispatch({ type: CREATE, team })
    })
  }
}

export function useCredit(teamId) {
  return (dispatch) => {
    var updates = {lastCreditUsed: Date.now()};
    const teamRef = database.ref('teams/' + teamId)
    teamRef.update(updates)
    teamRef.once('value', (snapshot) => {
      let team = snapshot.val()
      dispatch({ type: UPDATE, team })
    })
  }
}

export function removeTeam(team) {
  return { type: REMOVE, team };
}
