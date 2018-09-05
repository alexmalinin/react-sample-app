import React, { Component } from "react";

import { colors } from "@styled/constants/colors";
import { ColoredLinks } from "@styled/Home";
import StyledNotFound from "@styled/NotFound";

class NotFound extends Component {
  componentWillMount() {
    document.title = "404 not found | Digital Village";
  }

  render() {
    return (
      <StyledNotFound>
        <h1>
          <ColoredLinks to="/" color={colors.purple}>
            404
          </ColoredLinks>
        </h1>
        <span>Page not found</span>
        <p>
          The Page you are looking for doesn't exist or other error occurred.{" "}
          <br />
          <ColoredLinks to="/" color={colors.lightBlue}>
            Go back{" "}
          </ColoredLinks>, or head over to{" "}
          <ColoredLinks to="/" color={colors.green}>
            Digital-village.com
          </ColoredLinks>{" "}
          to choose a new direction.
        </p>
        <p>{window.location.pathname}</p>
      </StyledNotFound>
    );
  }
}

export default NotFound;
