import React from "react";
import { Menu, Grid, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import UserPanel from "./UserPanel";
import Signout from "./Signout";
import Follow from "./Follow";

class Sidepanel extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ backgroundColor: "#403187" }}
      >
        <UserPanel currentUser={currentUser} />
        <Follow currentUser={currentUser} />
        <Link to="/settings">
          <Grid style={{ color: "white", marginLeft: "1.2em", marginTop: 75 }}>
            <Grid.Row>
              <Icon className="settings" />
              <Header.Content>Settings</Header.Content>
            </Grid.Row>
          </Grid>
        </Link>
        <Signout currentUser={currentUser} />
      </Menu>
    );
  }
}

export default Sidepanel;
