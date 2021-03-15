import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Grid, Header, Icon } from "semantic-ui-react";

const Signout = ({ signOut }) => {
  const handleSignout = () => {
    signOut();
  };
  return (
    <Grid
      style={{ color: "white", marginLeft: "1.2em", marginTop: "75px" }}
      onClick={handleSignout}
    >
      <Grid.Row>
        <Icon className="sign-out" />
        <Header.Content>Signout</Header.Content>
      </Grid.Row>
    </Grid>
  );
};

const mapDispatchToProps = {
  signOut: actions.signOut,
};

export default connect(null, mapDispatchToProps)(Signout);
