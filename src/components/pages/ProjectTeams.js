import React, { Component, Proptypes } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createTeam, loadTeams } from '../../ducks/teams'
import { updateProject } from '../../ducks/projects'
import { selectCurrentProject } from '../../ducks'
import TeamCard from '../elements/TeamCard'
import './ProjectTeams.css';

function mapStateToProps(state) {
  return {
    teams: state.teams,
    currentProject: selectCurrentProject(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createTeam, loadTeams, updateProject }, dispatch)
}

class ProjectTeams extends Component {
  
  componentDidMount() {
    this.props.loadTeams(this.props.params.projectSlug)
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.currentProject !== nextProps.currentProject) {
      this._populateInputs(nextProps)
    }
  }
  
  componentDidUpdate() {
    if (!this.refs.creditWorth.value && !this.refs.creditCooldown.value) {
      if (this.props.currentProject) this._populateInputs(this.props)
    }
  }
  
  _populateInputs = (props) => {
    this.refs.creditWorth.value = props.currentProject.creditWorth
    this.refs.creditCooldown.value = props.currentProject.creditCooldown
  }
  
  _handleCreateTeam = () => {
     let name = this.refs.name.value
     let member1 = this.refs.member1.value
     let member2 = this.refs.member2.value
     let member3 = this.refs.member3.value
     let { params: {projectSlug}, createTeam } = this.props
     createTeam({ name, members:[member1, member2, member3], projectSlug })
  }
  
  _handleEnter = e => e.keyCode === 13 ? this._handleCreateTeam() : null
  
  _handleUpdate = (e) => {
    if (e.keyCode === 13) {
      const { currentProject } = this.props
      const creditWorth = this.refs.creditWorth.value
      const creditCooldown = this.refs.creditCooldown.value
      let project = Object.assign({}, currentProject, {creditWorth, creditCooldown})
      this.props.updateProject(project)
    }
  }
  
  render() {
    return (
      <div className="projects">
        <h3>Project Settings:
          <span>
            Credit worth:
            <input ref="creditWorth" onKeyUp={this._handleUpdate}/>
            minutes
          </span>
          <span>
            Credit cooldown:
            <input ref="creditCooldown" onKeyUp={this._handleUpdate}/>
            minutes
          </span>
        </h3>
        <div className="projects-container">
          {this.props.teams.map(t => <TeamCard key={t.id} team={t}/>)}
        </div>
        <div className="create-team">
          <h2>Create New Team:</h2>
          <input ref="name" type="text" onKeyUp={this._handleEnter}/>
          <input ref="member1" type="text" onKeyUp={this._handleEnter}/>
          <input ref="member2" type="text" onKeyUp={this._handleEnter}/>
          <input ref="member3" type="text" onKeyUp={this._handleEnter}/>
          <button onClick={this._handleCreateTeam}>Create</button>
        </div>
      </div>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTeams)
