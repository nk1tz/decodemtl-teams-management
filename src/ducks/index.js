import R from 'ramda'
import { createSelector } from 'reselect'
import projects from './projects'
import teams from './teams'


export default {
  projects,
  teams
}

export const selectCurrentLocation = (state) => state.routing.locationBeforeTransitions.pathname

export const selectTeamList = (state) => state.teams

export const selectProjectList = (state) => state.projects

export const selectCurrentProject = createSelector(
  selectCurrentLocation, selectProjectList,
  (currentLocation, projectList) => {
    let projectSlug = currentLocation.split('/')[2]
    let currentProject = projectList.find(p => p.slug === projectSlug)
    return currentProject
  }
)

export const selectCurrentTeam = createSelector(
  selectCurrentLocation, selectTeamList,
  (currentLocation, teamList) => {
    let teamSlug = currentLocation.split('/')[3]
    let projectSlug = currentLocation.split('/')[2]
    let currentTeam = teamList.find(t => t.slug===teamSlug && t.projectSlug===projectSlug)
    return currentTeam
  }
)
