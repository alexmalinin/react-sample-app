import React, { Component } from "react";

import SubHeaderLink from "./SubHeaderLink";
import ProgressBars from "../../layout/ProgressBar";

class SubHeaderItemWrap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let path = nextProps.path;
    let currentLocation = window.location.pathname;

    let index = currentLocation.lastIndexOf("/");

    if (index !== -1) {
      let res = currentLocation.substring(index + 1);
      let isActive = null;

      path === res ? (isActive = true) : (isActive = false);

      this.setState({ active: isActive });
    }
  }

  render() {
    let { active } = this.state;

    return (
      <section className={active ? "active" : ""}>
        <SubHeaderLink
          className={this.props.className}
          content={this.props.content}
        />
        {this.props.children}
      </section>
    );
  }
}

export default SubHeaderItemWrap;
