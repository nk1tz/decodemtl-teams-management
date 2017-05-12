import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
import * as reducers from './ducks'
// import mySaga from './sagas'
import thunk from 'redux-thunk';
import App from './components/App';
import Projects from './components/pages/Projects';
import ProjectTeams from './components/pages/ProjectTeams';
import Team from './components/pages/Team';

import './index.css';


const rootReducer = combineReducers(reducers)
// create the saga middleware
// const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
  // applyMiddleware(sagaMiddleware)
)

// then run the saga
// sagaMiddleware.run(mySaga)

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>

        <Route path="/projects" component={Projects} />
        <Route path="/projects/:projectSlug" component={ProjectTeams}/>
        <Route path="/projects/:projectSlug/:teamSlug" component={Team}/>

      </Route>
    </Router>
  </Provider>
);


ReactDOM.render(routes, document.getElementById("💎"))
