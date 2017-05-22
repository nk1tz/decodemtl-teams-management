import slug from 'slug'
import database from '../firebase'
// projects.js

const LOAD   = 'projects/LOAD';
const CREATE = 'projects/CREATE';
const UPDATE = 'projects/UPDATE';
const REMOVE = 'projects/REMOVE';

const dbProjectsRef = database.ref('projects/')


// dbProjectsRef.on('value', (snapshot) => {
//   const projects = snapshot.val()
//   // loadAllProjects(projects)
// });

export default function projects(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return action.projects
    case CREATE:
      return Object.assign({}, state, action.project)
    // case REMOVE:
    //   return R.remove(R.indexOf(action.project, state), 1, state)
    case UPDATE:
      return Object.assign({}, state, action.project)
    default:
      return state
  }
}

// function loadAllProjects(projects) {
//   return (dispatch) => {
//     dispatch({ type: LOAD, projects })
//   }
// }

export function loadProjects() {
  return (dispatch) => {
    return dbProjectsRef.once('value', (snapshot) => {
      let projects = snapshot.val()
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
    newProjectsRef.once('value', (snapshot) => {
      let project = {[snapshot.val().id] : snapshot.val()}
      dispatch({ type: CREATE, project})
    })
  }
}

export function changeCreditWorth(projectId, creditWorth) {
  return (dispatch) => {
    var updates = {};
    const projectRef = database.ref('projects/' + projectId)
    projectRef.update({creditWorth})
    projectRef.once('value', (snapshot) => {
      let project = {[snapshot.val().id] : snapshot.val()}
      dispatch({ type: UPDATE, project })
    })
  }
}

export function changeCreditCooldown(projectId, creditCooldown) {
  return (dispatch) => {
    var updates = {};
    const projectRef = database.ref('projects/' + projectId)
    projectRef.update({creditCooldown})
    projectRef.once('value', (snapshot) => {
      let project = {[snapshot.val().id] : snapshot.val()}
      dispatch({ type: UPDATE, project })
    })
  }
}


export function removeProject(project) {
  return { type: REMOVE, project };
}
