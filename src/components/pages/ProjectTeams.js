import React, { Component, Proptypes } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createTeam, loadTeams } from '../../ducks/teams'
import TeamCard from '../elements/TeamCard'
import './ProjectTeams.css';

function mapStateToProps(state) {
  return {
    teams: state.teams
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createTeam, loadTeams }, dispatch)
}

class ProjectTeams extends Component {
  
  componentWillMount() {
    this.props.loadTeams(this.props.params.projectSlug)
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
  
  
  render() {
    return (
      <div className="projects">
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
