import React from "react";
import { Grid, Header } from "semantic-ui-react";

const Main = ({ currentUser }) => {
  return (
    <Grid>
      <Grid.Row>
        <Header color="violet">Welcome {currentUser.displayName}</Header>
      </Grid.Row>
    </Grid>
  );
};

export default Main;
