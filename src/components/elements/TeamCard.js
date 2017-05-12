import React from 'react'
import { Link } from 'react-router'

export default (props) => (
  <Link to={`/projects/${props.team.projectSlug}/${props.team.slug}`} className="team-card">
    {props.team.name}
  </Link>
)
