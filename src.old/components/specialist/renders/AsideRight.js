import React, { Component } from "react";
import { S_Aside } from "../../../styleComponents/layout/S_Aside";

class Aside extends Component {
  state = {
    isOpen: false
  };

  render() {
    const { isOpen } = this.state;

    return (
      <S_Aside open={isOpen} orientation="right" onClick={this.handleClick}>
        <div className="fake" />
        <div className="headerAside">
          <span className="nameAside">Dashboard</span>
          <span className="iconAside">
            <i className="talk outline icon" />
          </span>
          <span className="arrowRightAside" />
        </div>
        <div className="bodyAside">
          <ul>
            <li>
              My Projects
              <ul>
                <li>Project Name</li>
                <li>
                  Project Name 2
                  <ul>
                    <li>Module 1</li>
                    <li>Module 2</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>My Tasks</li>
            <li>My Teams</li>
          </ul>
        </div>
      </S_Aside>
    );
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
}

export default Aside;
