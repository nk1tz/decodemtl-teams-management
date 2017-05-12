import React from 'react'
import { Link } from 'react-router'

export default (props) => (
  <Link to={`/projects/${props.project.slug}`} className="project-card">
    {props.project.name}
  </Link>
)
