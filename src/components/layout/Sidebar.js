import React, { Component } from "react";
import { connect } from "react-redux";
import StyledSidebar from "../../styleComponents/layout/StyledSidebar";
import NavigationLinks from "./NavigationLinks";
import AccountLinks from "./AccountLinks";
import { toggleSidebar } from "../../actions/actions";

class Sidebar extends Component {
  render() {
    let visible = this.props.sidebar;

    return (
      <div onClick={this.close} ref={this.container}>
        <StyledSidebar isOpen={visible} width={"33%"} right>
          <NavigationLinks />
          <AccountLinks />
        </StyledSidebar>
      </div>
    );
  }

  close = () => {
    this.props.toggleSidebar();
  };
}

export default connect(({ sidebar }) => ({ sidebar }), { toggleSidebar })(
  Sidebar
);
