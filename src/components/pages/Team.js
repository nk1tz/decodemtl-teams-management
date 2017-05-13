import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectCurrentTeam } from '../../ducks'
import './Team.css';

console.log(selectCurrentTeam)

function mapStateToProps(state) {
  return {
    currentTeam: selectCurrentTeam(state)
  }
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators({ loadTeam }, dispatch)
}

class Team extends Component {
  
  render() {
    let { currentTeam, params } = this.props
    if(!currentTeam || params.teamSlug !== currentTeam.slug) {
      return <h1>LOADING</h1>
    }
    return (
      <div>
        <h3>Members:
          {this.props.currentTeam.members.map((m,i) => (
            <span key={m}>{`${i?",":""} ${m}`}</span>
          ))}
        </h3>
        <h3>Credits: </h3>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Team)
