import R from 'ramda'
import slug from 'slug'
import database from '../firebase'
// projects.js

const LOAD   = 'projects/LOAD';
const CREATE = 'projects/CREATE';
const UPDATE = 'projects/UPDATE';
const REMOVE = 'projects/REMOVE';

const dbProjectsRef = database.ref('projects/')


export default function projects(state = [], action = {}) {
  switch (action.type) {
    case LOAD:
      return action.projects
    case CREATE:
      return [...state, action.project]
    case REMOVE:
      return R.remove(R.indexOf(action.project, state), 1, state)
    case UPDATE:
      return R.update(R.findIndex(R.propEq('id', action.project.id), state), action.project, state)
    default:
      return state
  }
}

export function loadProjects() {
  return (dispatch) => {
    return dbProjectsRef.once('value', (snapshot) => {
      let projects = R.values(snapshot.val())
      dispatch({ type: LOAD, projects })
    })
  }
}

export function createProject(project) {
  const newProjectsRef = dbProjectsRef.push()
  project.id = newProjectsRef.key
  project.slug = slug(project.name)
  project.creditWorth = 15
  project.creditCooldown = 60
  return (dispatch) => {
    newProjectsRef.set(project)
    .then(() => dispatch({ type: CREATE, project }))
  }
}

export function updateProject(project) {
  return (dispatch) => {
    var updates = {};
    console.log(project)
    updates['projects/' + project.id] = project
    database.ref().update(updates)
    .then(() => dispatch({ type: UPDATE, project }))
  }
}

export function removeProject(project) {
  return { type: REMOVE, project };
}
