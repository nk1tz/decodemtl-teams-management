import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectCurrentTeam, selectCurrentProject } from '../../ducks'
import { useCredit } from '../../ducks/teams'
import './Team.css';


function mapStateToProps(state) {
  return {
    currentTeam: selectCurrentTeam(state),
    currentProject: selectCurrentProject(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ useCredit }, dispatch)
}

class Team extends Component {
  
  _handleUseCredit = () => {
    this.props.useCredit(this.props.currentTeam.id)
  }
  
  render() {
    let { currentTeam, params } = this.props
    if(!currentTeam || params.teamSlug !== currentTeam.slug) {
      return <h1>LOADING</h1>
    }
    return (
      <div>
        <h3>Members:
          {currentTeam.members.map((m,i) => (
            <span key={m}>{`${i?",":""} ${m}`}</span>
          ))}
        </h3>
        <h3>Credits: {this.props.currentTeam.credits}</h3>

        { this._isEligibleForCredit() ?
          <button onClick={this._handleUseCredit}>Use Credit</button>
          : null
        }

      </div>
    );
  }
  
  _isEligibleForCredit = () => {
    let { currentTeam, currentProject } = this.props
    return (
      !currentTeam.lastCreditUsed ||
      Date.now() > currentTeam.lastCreditUsed + currentProject.creditCooldown * 60000
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Team)
