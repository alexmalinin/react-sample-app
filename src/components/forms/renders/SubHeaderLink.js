import React, { Component } from "react";

import StyledSubHeaderLink from "../../../styleComponents/StyledSubHeaderLink";

class SubHeaderLink extends Component {
  render() {
    return (
      <StyledSubHeaderLink className={this.props.className}>
        {this.props.content}
      </StyledSubHeaderLink>
    );
  }
}

export default SubHeaderLink;
