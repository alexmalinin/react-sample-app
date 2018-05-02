import React, { Component } from "react";
import { connect } from "react-redux";
import { hideFooter } from "../actions/actions";
import { colors } from "../styleComponents/constants/colors";
import { ColoredLinks } from "../styleComponents/StyledHome";
import StyledNotFound from "../styleComponents/StyledNotFound";

class NotFound extends Component {
  componentWillMount() {
    this.props.hideFooter();
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
          <ColoredLinks to="/" color={colors.blue}>
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

  submit = values => {
    console.log("----values:", values);
  };
}

export default connect(null, { hideFooter })(NotFound);
