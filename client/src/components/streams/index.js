import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import StreamShow from "./StreamShow";
import Messages from "../Message/Messages";
import Sidepanel from "../SidePanel/SidePanel";

const Stream = ({ currentChannel, currentUser }) => {
  const renderStream = (currentChannel) => {
    if (currentChannel) {
      return (
        <StreamShow
          chat={currentChannel}
          currentChannel={currentChannel}
          currentUser={currentUser}
        />
      );
    }
  };

  return (
    <Grid columns="equal">
      <Sidepanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
      />
      <Grid.Column style={{ marginLeft: 320 }} className="stream">
        {renderStream(currentChannel)}
      </Grid.Column>
      <Grid.Column width={4}>
        {" "}
        <Messages
          style={{ borderRadius: "50%" }}
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
        />
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

export default connect(mapStateToProps)(Stream);
