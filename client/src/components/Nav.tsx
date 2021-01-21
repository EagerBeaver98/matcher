import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import '../bootstrap/vendor/bootstrap/css/custom.css'

function Nav(props: any) {
  let partner: string = "nav-item right";
  let login: string = "nav-item right";
  let match: string = "nav-item right";
  let matchList: string = "nav-item right";

  if (props.view === "login") {
    login += " active";
  }

  if (props.view === "match") {
    match += " active";
  }

  if (props.view === 'partner') {
    partner += " active";
  }

  if (props.view === 'match-list') {
    matchList += ' active';
  }

  return (
    <ul className="navbar-nav ml-auto">
      <li className={partner}>
        <span className="nav-link" onClick={() => props.pageChange('partner')}>Partner Management
        </span>
      </li>
      <li className={match}>
        <span className="nav-link" onClick={() => props.pageChange('match')}>Match
        </span>
      </li>
      <li className={matchList}>
        <span className="nav-link" onClick={() => props.pageChange('match-list')}>My Matches
        </span>
      </li>
      <li className={login}>
        <span className="nav-link" onClick={() => props.pageChange('login')}>Login
        </span>
      </li>
    </ul>
  )
}

export default Nav