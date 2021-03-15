import React from "react";
import firebase from "../../config";
import AvatarEditor from "react-avatar-editor";
import * as actions from "../../store/actions/index";
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  Button,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    previewImage: "",
    croppedImage: "",
    blob: "",
    uploadedCroppedImage: "",
    userRef: firebase.auth().currentUser,
    metadata: {
      contentType: "image/jpeg",
    },
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  dropdownOptions = () => [
    {
      key: "avatar",
      text: <span onClick={this.openModal}>Change Avatar </span>,
    },
  ];

  handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleCropImage = () => {
    if (this.AvatarEditor) {
      this.AvatarEditor.getImageScaledToCanvas().toBlob((blob) => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob,
        });
      });
    }
  };

  uploadCroppedImage = () => {
    const { userRef, blob, metadata, user } = this.state;

    this.props.uploadImage(blob, metadata, userRef, user).then(() => {
      this.closeModal();
    });
  };

  render() {
    const { user, modal, previewImage, croppedImage } = this.state;
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Link to="/">
              <Header inverted floated="left" as="h3">
                <Icon name="trophy" />
                <Header.Content>Stream</Header.Content>
              </Header>
            </Link>
            <Header style={{ paddingTop: "80px" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Row>
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input
                onChange={this.handleChange}
                fluid
                type="file"
                label="New Avatar"
                name="previewImage"
              />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui center aligned grid">
                    {previewImage && (
                      <AvatarEditor
                        ref={(node) => (this.AvatarEditor = node)}
                        image={previewImage}
                        width={120}
                        height={120}
                        border={50}
                        scale={1.2}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column>
                    {croppedImage && (
                      <Image
                        style={{ margin: "3.5em auto" }}
                        width={100}
                        height={100}
                        src={croppedImage}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {croppedImage && (
                <Button
                  color="green"
                  inverted
                  onClick={this.uploadCroppedImage}
                >
                  <Icon name="save" />
                  Change Avatar
                </Button>
              )}
              <Button color="green" inverted onClick={this.handleCropImage}>
                <Icon name="image" />
                Preview
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="save" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  uploadImage: actions.uploadImage,
};

export default connect(null, mapDispatchToProps)(UserPanel);
