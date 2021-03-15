import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "../../config";
import * as actions from "../../store/actions/index";
import _ from "lodash";
import {
  Grid,
  Form,
  Segment,
  Button,
  List,
  Modal,
  Input,
  Menu,
  Label,
  Message,
  Icon,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Settings = ({ addChannel, currentUser, channels, fetchChannel }) => {
  const [modals, modalState] = useState(false);
  const [channelsRef, set] = useState(firebase.database().ref("channels"));
  const [channelName, setName] = useState("");
  const [channelDetails, setDetails] = useState("");
  const user = currentUser;
  const streams = channels;

  useEffect(() => {
    fetchChannel();
  }, []);

  const isFormValid = ({ channelName, channelDetails }) => {
    setName(channelName);
    setDetails(channelDetails);
    addChannelInfo();
  };

  const openModal = () => modalState(true);
  const closeModal = () => modalState(false);
  const key = channelsRef.push().key;

  const newChannel = {
    id: key,
    name: channelName,
    details: channelDetails,
    createdBy: {
      name: user.displayName,
      avatar: user.photoURL,
      id: user.uid,
    },
  };

  const addChannelInfo = () => {
    addChannel(key, newChannel)
      .then(() => {
        setName("");
        setDetails("");
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid({ channelName, channelDetails })) {
      setName("");
      setDetails("");
      closeModal();
    }
  };

  const renderStreams = () => {
    if (streams) {
      const chann = _.map(streams, (channel) => {
        if (user.uid == channel.createdBy.id)
          return (
            <List>
              <List.Item
                key={channel.id}
                name={channel.name}
                style={{ opacity: 0.7 }}
              >
                <Link to={`/stream/${channel.name}`}>
                  {channel.name}
                  id: {channel.id}
                </Link>{" "}
                <br />
              </List.Item>
            </List>
          );
        else {
          return <Header>Sorry! You dont have stream rooms</Header>;
        }
      });
      if (!_.isEmpty(chann)) {
        return chann;
      }
    }
  };

  return (
    <Grid
      columns="equal"
      style={{ color: "violet" }}
      style={{ margin: "100px" }}
    >
      <Grid.Row>
        <Link to="/">
          <Button color="violet" content="Back" icon="arrow left" />
        </Link>

        <Button
          color="violet"
          icon="plus"
          content="Create Stream"
          onClick={openModal}
        />
      </Grid.Row>

      <Grid.Row>
        <div>You streams and streamIds</div>
        {renderStreams()}
      </Grid.Row>

      <Modal basic open={modals} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel "
                name="channelName"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the stream"
                name="channelDetails"
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" />
            Add
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
};

const mapDispatchToProps = {
  addChannel: actions.addChannel,
  fetchChannel: actions.fetchChannel,
  setCurrentChannel: actions.setCurrentChannel,
  setPrivateChannel: actions.setPrivateChannel,
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    channels: state.channels,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
