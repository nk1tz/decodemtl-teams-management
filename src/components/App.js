import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadProjects } from '../ducks/projects'
import { loadTeams } from '../ducks/teams'


import './App.css'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadProjects, loadTeams }, dispatch)
}

class App extends Component {
  
  componentWillMount() {
    this.props.loadProjects()
    .then(this.props.loadTeams)
  }
  
  _renderBreadCrumbs = () => {
    let path = ""
    return this.props.router.location.pathname.split("/").filter(x=>x!=="")
    .map((p,i) => {
      path += '/'+p
      return <Link key={p} to={path}>{i?'>':''} {p.capitalize()} </Link>
    })
  }
  
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the DecodeMTL Teams Management Utility</h2>
        </div>
        {this._renderBreadCrumbs()}
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App)
