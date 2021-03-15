import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import { Provider, connect } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import history from "./history";

import rootReducer from "./store/reducers/index";
import "semantic-ui-css/semantic.min.css";

import reduxThunk from "redux-thunk";

import { setUser, clearUser } from "./store/actions/index";

import firebase from "./config";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import Stream from "./components/Streams";
import Login from "./components/Auth/Login";
import App from "./App";
import Settings from "./components/Settings/Settings";
import Register from "./components/Auth/Register";
import Spinner from "./Spinner";

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    });
  }
  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/stream/:id" component={Stream} />
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const mapStateFromProps = (state) => ({
  isLoading: state.auth.isLoading,
});

const RootWithAuth = withRouter(
  connect(mapStateFromProps, { setUser, clearUser })(Root)
);

const Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
