import R from 'ramda'
import slug from 'slug'
import database from '../firebase'

// teams.js

const LOAD   = 'teams/LOAD';
const CREATE = 'teams/CREATE';
const UPDATE = 'teams/UPDATE';
const REMOVE = 'teams/REMOVE';

const dbTeamsRef = database.ref('teams/')



export default function teams(state = [], action = {}) {
  switch (action.type) {
    case LOAD:
      return action.teams
    case CREATE:
      return [...state, action.team]
    case REMOVE:
      return R.remove(R.indexOf(action.team, state), 1, state)
    default:
      return state
  }
}

export function loadTeams(projectSlug) {
  return (dispatch) => {
    dbTeamsRef.equalTo(projectSlug, "projectSlug").once('value', (snapshot) => {
      let teams = R.values(snapshot.val())
      console.log(teams)
      dispatch({ type: LOAD, teams })
    })
  }
}

export function createTeam(team) {
  const newTeamsRef = dbTeamsRef.push()
  team.id = newTeamsRef.key
  team.slug = slug(team.name)
  return (dispatch) => {
    newTeamsRef.set(team)
    dispatch({ type: CREATE, team })
  }
}

export function updateTeam(team) {
  return { type: UPDATE, team };
}

export function removeTeam(team) {
  return { type: REMOVE, team };
}
