import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import firebase from "../../config";
import * as actions from "../../store/actions/index";
import {
  Grid,
  Form,
  Segment,
  Button,
  Embed,
  Header,
  Image,
  Message,
  Comment,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  state = {
    currentChannel: this.props.currentChannel,
    isChannelFollow: false,
    id: this.props.chat.id,
    channelName: this.props.chat.name,
    author: this.props.chat.createdBy.name,
    avatar: this.props.chat.createdBy.avatar,
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
  };

  componentDidMount() {
    const { id, user } = this.state;
    this.props.fetchChannel();
    this.buildPlayer();
    if (user && id) {
      this.addUserStarsListener(id, user.uid);
    }
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    const id = this.state.id;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  addUserStarsListener = (channelId, userId) => {
    this.state.usersRef
      .child(userId)
      .child("starred")
      .once("value")
      .then((data) => {
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val());
          const prevStarred = channelIds.includes(channelId);
          this.setState({ isChannelFollow: prevStarred });
        }
      });
  };

  handleStar = () => {
    this.setState(
      (prevState) => ({
        isChannelFollow: !prevState.isChannelFollow,
      }),
      () => this.starChannel()
    );
  };

  starChannel = () => {
    if (this.state.isChannelFollow) {
      this.props.starChannel(this.props.currentUser, this.props.currentChannel);
    } else {
      this.state.usersRef
        .child(`${this.state.user.uid}/starred`)
        .child(this.state.id)
        .remove((err) => {
          if (err !== null) {
            console.error(err);
          }
        });
    }
  };

  render() {
    const { channelName, author, avatar, isChannelFollow } = this.state;
    return (
      <div>
        <Link to="/">
          <Button
            style={{ marginBottom: 20 }}
            color="violet"
            content="Back"
            icon="arrow left"
          />
        </Link>

        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <Grid style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={10}>
              <Comment.Group size="massive">
                <Comment>
                  <Comment.Avatar as="a" src={avatar} />
                  <Comment.Content>
                    <Comment.Author as="a" style={{ color: "black" }}>
                      {author}
                    </Comment.Author>
                    <Comment.Text style={{ color: "black" }}>
                      {channelName}{" "}
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button
                style={{ right: "0" }}
                onClick={this.handleStar}
                color={isChannelFollow ? "grey" : "violet"}
                content="Follow"
                icon="heart"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchChannel: actions.fetchChannel,
  starChannel: actions.starChannel,
};

export default connect(null, mapDispatchToProps)(StreamShow);
