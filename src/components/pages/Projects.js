import React, { Component, Proptypes } from 'react';
import R from 'ramda'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createProject, loadProjects } from '../../ducks/projects'
import { selectProjectsList } from '../../ducks'
import ProjectCard from '../elements/ProjectCard'
import './Projects.css';

function mapStateToProps(state) {
  return {
    projects: selectProjectsList(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createProject, loadProjects }, dispatch)
}

class Projects extends Component {
  
  componentDidMount() {
    this.props.loadProjects()
  }
  
  _handleCreateProject = () => {
     let { name: {value: name}, desc: {value: desc} } = this.refs
     if (name && desc) {
       this.props.createProject({ name, desc })
     }
  }
  
  _handleEnter = e => e.keyCode === 13 ? this._handleCreateProject() : null
  
  
  render() {
    return (
      <div className="projects">
        <div className="projects-container">
          {this.props.projects.map(p => <ProjectCard key={p.id} project={p}/>)}
        </div>
        {this.props.children}
        <div className="create-project">
          <h2>Create New Project:</h2>
          <input ref="name" type="text" onKeyUp={this._handleEnter}/>
          <textarea ref="desc" type="text" onKeyUp={this._handleEnter}/>
          <button onClick={this._handleCreateProject}>Create</button>
        </div>
      </div>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
