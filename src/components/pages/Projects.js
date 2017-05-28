import React, { Component, Proptypes } from 'react';
import R from 'ramda'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Row } from 'react-materialize'
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
    let name = this.refs.name.state.value;
    let desc = this.refs.desc.state.value;
    if (name && desc) {
       this.props.createProject({ name, desc })
     }
  }
  
  _handleEnter = e => e.keyCode === 13 ? this._handleCreateProject() : null
  
  render() {
    return (
      <div className="projects">
        <Row className="projects-container">
          {this.props.projects.map(p => <ProjectCard key={p.id} project={p}/>)}
        </Row>
        {this.props.children}
        <div className="create-project">
          <h2>Create New Project:</h2>
          <Input ref="name" label="Project Name" onKeyUp={this._handleEnter}/>
          <Input ref="desc" label="Description" onKeyUp={this._handleEnter}/>
          <button onClick={this._handleCreateProject}>Create</button>
        </div>
      </div>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
