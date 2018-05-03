import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProjectEpic } from "../../actions/actions";
import { Dropdown } from "semantic-ui-react";
import EditEpicModal from "../modals/EditEpicModal";
import { CLIENT } from "../../constans/constans";

class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false
    };
  }

  showDropdown = () => {
    let prevState = this.state.dropdown;
    this.setState({
      dropdown: !prevState
    });
  };

  deleteEpic = () => {
    const { epic, project, deleteProjectEpic } = this.props;
    deleteProjectEpic(project, epic.id);
  };

  render() {
    const {
      epic,
      number,
      updateEpicList,
      updateProjectEpic,
      changeUserType
    } = this.props;

    return (
      <div className="dragContainer">
        <h3>Module {number}</h3>
        <div className="module">
          <h4>{epic.description}</h4>
          <p>{epic.user_story}</p>
          <div>
            <div className="subline">
              <img src="/images/marker.png" alt="marker" />
              <span>Remote</span>
            </div>
            <div className="subline">
              <img src="/images/calendar.png" alt="calendar" />
              <span>24/02/2018</span>
            </div>
            <div className="subline">
              <img src="/images/dollar.png" alt="dollar" />
              <span>$20,000</span>
            </div>
            <div className="subline">
              <img src="/images/clock.png" alt="clock" />
              <span>4 weeks</span>
            </div>
          </div>
          {changeUserType === CLIENT && (
            <div className="dropdown">
              <a tabIndex="1" className="trigger">
                ...
              </a>
              <div className="menu">
                <div className="item">
                  <EditEpicModal
                    epic={epic}
                    number={number}
                    updateProjectEpic={updateProjectEpic}
                  />
                </div>
                <div className="item">
                  <div onClick={this.deleteEpic}>Delete</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(({ changeUserType }) => ({ changeUserType }), {
  deleteProjectEpic
})(Module);
