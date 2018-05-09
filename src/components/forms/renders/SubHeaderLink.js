import React, { Component } from "react";

import StyledSubHeaderLink from "../../../styleComponents/StyledSubHeaderLink";

class SubHeaderLink extends Component {
  render() {
    return (
      <StyledSubHeaderLink className={this.props.className}>
        {this.props.number}
        {/* <span></span> */}
      </StyledSubHeaderLink>
    );
  }
}

export default SubHeaderLink;
