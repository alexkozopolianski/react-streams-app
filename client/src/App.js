import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import Sidepanel from "./components/SidePanel/SidePanel";
import Channels from "./components/Channels/Channels";
import Main from "./components/Channels/Main";

const App = ({ currentUser }) => {
  return (
    <Grid columns="equal" className="app">
      <Sidepanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
      />
      <Grid.Column className="center-content">
        <Main currentUser={currentUser} />
        <Channels currentUser={currentUser} />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  currentChannel: state.chat.currentChannel,
  isPrivateChannel: state.chat.isPrivateChannel,
  userPosts: state.chat.userPosts,
});

export default connect(mapStateToProps)(App);
