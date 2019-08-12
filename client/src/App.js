import React from 'react';
import './App.css';
import { Router,  Route, Switch } from 'react-router-dom';

import StreamCreate from './components/streams/StreamCreate';
import StreamDelete from './components/streams/StreamDelete';
import StreamEdit from './components/streams/StreamEdit';
import StreamList from './components/streams/StreamList';
import StreamShow from './components/streams/StreamShow';
import history from './history';

import Header from './components/Header';



const  App = () => {
  return (
   <div className="app">
    <div className="ui container" >
    <Router history={history}>
      <div>
        <Header />
        <Switch>
        <Route path="/" exact component={StreamList} />
        <Route path="/streams/new" exact component={StreamCreate} />
        <Route path="/streams/edit/:id" exact component={StreamEdit} />
        <Route path="/streams/delete/:id" exact component={StreamDelete} />
         <Route path="/streams/:id" exact component={StreamShow} />
        </Switch>
      </div>
    </Router>
    </div>
    </div>
  );
};

export default App;
