import React, { Component } from "react";

class Dropdown extends Component {
  state = {
    opened: false
  };

  openDropdown = e => {
    e.stopPropagation();

    this.setState(
      {
        showDropdown: true
      },
      () => {
        document.addEventListener("click", this.closeDropdown);
      }
    );
  };

  closeDropdown = () => {
    this.setState(
      {
        showDropdown: false
      },
      () => {
        document.removeEventListener("click", this.closeDropdown);
      }
    );
  };

  render() {
    const { trigger, children } = this.props;
    const { opened } = this.state;
    return (
      <div>
        {trigger}
        {opened && children}
      </div>
    );
  }
}

export default Dropdown;

//ITS TODO COMPONENT
