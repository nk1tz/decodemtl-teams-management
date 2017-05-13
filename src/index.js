import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './ducks'
import thunk from 'redux-thunk';
import App from './components/App';
import Projects from './components/pages/Projects';
import ProjectTeams from './components/pages/ProjectTeams';
import Team from './components/pages/Team';

import './index.css';


const rootReducer = combineReducers({...reducers, routing: routerReducer})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:projectSlug" component={ProjectTeams}/>
        <Route path="/projects/:projectSlug/:teamSlug" component={Team}/>
      </Route>
    </Router>
  </Provider>
);


ReactDOM.render(routes, document.getElementById("💎"))
