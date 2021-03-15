import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";
import loading from "./img/loading.gif";

const Spinner = () => (
  <Dimmer active style={{ backgroundColor: "#100e18" }}>
    <img src={loading} />
  </Dimmer>
);

export default Spinner;
