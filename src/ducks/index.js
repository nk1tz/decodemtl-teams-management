import R from 'ramda'
import { createSelector } from 'reselect'
import projects from './projects'
import teams from './teams'

export default {
  projects,
  teams
}

export const selectCurrentLocation = (state) => state.routing.locationBeforeTransitions.pathname

export const selectTeams = (state) => state.teams

export const selectProjects = (state) => state.projects

export const selectTeamsList = (state) => R.values(state.teams)

export const selectProjectsList = (state) => R.values(state.projects)


export const selectCurrentProject = createSelector(
  [selectCurrentLocation, selectProjects],
  (currentLocation, projects) => {
    let projectSlug = currentLocation.split('/')[2]
    return R.find(R.propEq('slug', projectSlug))(R.values(projects))
  }
)

export const selectCurrentProjectTeams = createSelector(
  [selectCurrentLocation, selectTeams],
  (currentLocation, teams) => {
    let projectSlug = currentLocation.split('/')[2]
    return R.filter(t => t.projectSlug===projectSlug, R.values(teams))
  }
)

export const selectCurrentTeam = createSelector(
  [selectCurrentLocation, selectTeams],
  (currentLocation, teams) => {
    let teamSlug = currentLocation.split('/')[3]
    let projectSlug = currentLocation.split('/')[2]
    return R.find(R.propEq('projectSlug', projectSlug))(R.values(teams))
  }
)
