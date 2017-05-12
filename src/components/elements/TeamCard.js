import React from 'react'
import { Link } from 'react-router'

export default (props) => (
  <Link to={``} className="team-card">
    {props.team.name}
  </Link>
)
