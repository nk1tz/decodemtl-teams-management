import React, { Component } from 'react'
import { Link } from 'react-router'
import './App.css'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class extends Component {
  
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
