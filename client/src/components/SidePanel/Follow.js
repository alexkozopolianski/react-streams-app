import React from "react";
import { connect } from "react-redux";
import firebase from "../../config";
import {
  setCurrentChannel,
  setPrivateChannel,
} from "../../store/actions/index";
import { Menu, Icon } from "semantic-ui-react";

class Follow extends React.Component {
  state = {
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
    activeChannel: "",
    followChannels: [],
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = () => {
    this.state.usersRef.child(`${this.state.user.uid}/starred`).off();
  };

  addListeners = (userId) => {
    this.state.usersRef
      .child(userId)
      .child("starred")
      .on("child_added", (snap) => {
        const starredChannel = { id: snap.key, ...snap.val() };
        this.setState({
          followChannels: [...this.state.followChannels, starredChannel],
        });
      });

    this.state.usersRef
      .child(userId)
      .child("starred")
      .on("child_removed", (snap) => {
        const channelToRemove = { id: snap.key, ...snap.val() };
        const filtredChannels = this.state.followChannels.filter((channel) => {
          return channel.id !== channelToRemove.id;
        });
        this.setState({ followChannels: filtredChannels });
      });
  };

  displayChannels = (followChannels) =>
    followChannels.length > 0 &&
    followChannels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        {channel.name} <br />
      </Menu.Item>
    ));

  changeChannel = (channel) => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };

  setActiveChannel = (channel) => {
    this.setState({ activeChannel: channel.id });
  };

  render() {
    const { followChannels } = this.state;
    return (
      <Menu.Menu className="menu" style={{ color: "white", marginTop: "75px" }}>
        <Menu.Item>
          <span>
            <Icon name="heart" /> Follow
          </span>{" "}
          ({followChannels.length})
        </Menu.Item>
        {this.displayChannels(followChannels)}
      </Menu.Menu>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Follow);
