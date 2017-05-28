import React from 'react'
import { Link } from 'react-router'
import { Card, Col } from 'react-materialize'


export default (props) => (
    <Col m={4} s={12}>
      <Link to={`/projects/${props.project.slug}`} className="project-card">
        <Card className='blue-grey darken-1' textClassName='white-text'
          title={props.project.name}
          // actions={[<a href='#'>This is a link</a>]}
        >
          {props.project.name}
        </Card>
      </Link>
    </Col>
)
