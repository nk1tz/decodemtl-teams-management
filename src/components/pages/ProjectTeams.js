import React, { Component, Proptypes } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createTeam, loadTeams } from '../../ducks/teams'
import { changeCreditCooldown, changeCreditWorth } from '../../ducks/projects'
import { selectCurrentProject, selectCurrentProjectTeams } from '../../ducks'
import TeamCard from '../elements/TeamCard'
import './ProjectTeams.css';

function mapStateToProps(state) {
  return {
    teams: selectCurrentProjectTeams(state),
    currentProject: selectCurrentProject(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createTeam, loadTeams, changeCreditWorth, changeCreditCooldown
  }, dispatch)
}

class ProjectTeams extends Component {
  state = {
    creditWorth: this.props.currentProject ? this.props.currentProject.creditWorth : "",
    creditCooldown: this.props.currentProject ? this.props.currentProject.creditCooldown : ""
  }
  
  componentDidMount() {
    this.props.loadTeams()
  }
  
  componentWillReceiveProps(nextProps) {
    const { currentProject } = this.props
    if (currentProject !== nextProps.currentProject
        || currentProject.creditWorth !== nextProps.currentProject.creditWorth
        || currentProject.creditCooldown !== nextProps.currentProject.creditCooldown) {
      this.setState({
        creditWorth: nextProps.currentProject.creditWorth,
        creditCooldown: nextProps.currentProject.creditCooldown
      })
    }
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
  
  _updateCreditWorthOnEnter = (e) => {
    if (e.keyCode === 13) {
      const { currentProject, changeCreditWorth } = this.props
      changeCreditWorth(currentProject.id, this.state.creditWorth)
    }
  }
  _updateCreditCooldownOnEnter = (e) => {
    if (e.keyCode === 13) {
      const { currentProject, changeCreditCooldown } = this.props
      changeCreditCooldown(currentProject.id, this.state.creditCooldown)
    }
  }
  
  _handleCreditWorthTyping = ({target: {value}}) => this.setState({creditWorth: value})
  _handleCreditCooldownTyping = ({target: {value}}) => this.setState({creditCooldown: value})
  
  render() {
    const { creditWorth, creditCooldown } = this.state
    return (
      <div className="projects">
        <h3>Project Settings:
          <span>
            Credit worth:
            <input
              value={ creditWorth }
              onChange={ this._handleCreditWorthTyping }
              onKeyUp={ this._updateCreditWorthOnEnter }
            />
            minutes
          </span>
          <span>
            Credit cooldown:
            <input
              value={ creditCooldown }
              onChange={ this._handleCreditCooldownTyping }
              onKeyUp={ this._updateCreditCooldownOnEnter }
            />
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
