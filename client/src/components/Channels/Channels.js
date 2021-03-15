import React from "react";
import { connect } from "react-redux";
import firebase from "../../config";
import * as actions from "../../store/actions/index";
import _ from "lodash";

import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Channels extends React.Component {
  state = {
    activeChannel: "",
    user: this.props.currentUser,
    channels: [],
    channel: null,
    channelsRef: firebase.database().ref("channels"),
    messagesRef: firebase.database().ref("messages"),
    notifications: [],
    typingRef: firebase.database().ref("typing"),
    modal: false,
    firstLoad: true,
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.props.fetchChannel();
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };

  removeListeners = () => {
    this.state.channelsRef.off();
    this.state.channels.forEach((channel) => {
      this.state.messagesRef.child(channel.id).off();
    });
  };

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
      this.setState({ channel: firstChannel });
    }
    this.setState({ firstLoad: false });
  };

  removeListeners = () => {
    this.state.channelsRef.off();
  };

  changeChannel = (channel) => {
    this.setActiveChannel(channel);
    this.state.typingRef
      .child(this.state.channel.id)
      .child(this.state.user.uid)
      .remove();
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
    this.setState({ channel });
  };

  setActiveChannel = (channel) => {
    this.setState({ activeChannel: channel.id });
  };

  displayChannels() {
    const { channels } = this.props;
    const chann = _.map(channels, (channel) => {
      return (
        <Menu.Item
          key={channel.id}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === this.state.activeChannel}
        >
          <Link to={`/stream/${channel.name}`}>{channel.name}</Link> <br />
        </Menu.Item>
      );
    });
    if (!_.isEmpty(chann)) {
      return chann;
    }
  }

  render() {
    const { channels } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu className="menu">
          <Menu.Item style={{ color: "white" }}>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length})
          </Menu.Item>
          {this.displayChannels()}
        </Menu.Menu>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchChannel: actions.fetchChannel,
  setCurrentChannel: actions.setCurrentChannel,
  setPrivateChannel: actions.setPrivateChannel,
};

const mapStateToProps = ({ channels }) => {
  return {
    channels,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
