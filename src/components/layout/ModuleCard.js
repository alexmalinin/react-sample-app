import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProjectEpic } from "../../actions/actions";
import { Form, Input } from "semantic-ui-react";
import EditEpicModal from "../modals/EditEpicModal";
import { CLIENT, SPECIALIST, S_REDGUY } from "../../constans/constans";
import { getUserType } from "../../helpers/functions";

class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      name: this.props.epic.name,
      editing: false
    };
  }

  showDropdown = () => {
    let prevState = this.state.dropdown;
    this.setState({
      dropdown: !prevState
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.epic.name
    });
  }

  deleteEpic = () => {
    const { epic, project, deleteProjectEpic } = this.props;
    deleteProjectEpic(project, epic.id);
  };

  handleEdit = (e, data) => {
    if (data) {
      const { name, value } = data;
      this.setState({
        [name]: value
      });
    }
  };

  toggleEdit = () => {
    this.setState({
      editing: true
    });
    setTimeout(() => {
      this.editInput.focus();
    }, 10);
  };

  handleKeyboard = e => {
    if (e.keyCode === 27) {
      this.closeWithoutSave();
    }
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  closeWithoutSave = () => {
    this.setState({
      name: this.props.epic.name,
      editing: false
    });
  };

  renderDescription = () => {
    const { description } = this.props.epic;

    if (description.length > 70) {
      return description.slice(0, 70) + "...";
    } else return description;
  };

  renderStory = () => {
    const { user_story } = this.props.epic;

    if (user_story) {
      if (user_story.length > 120) {
        return user_story.slice(0, 120) + "...";
      } else return user_story;
    }
  };

  triggerModal = () => {
    if (this.props.changeUserType === CLIENT || getUserType() === S_REDGUY) {
      document.getElementById(`editEpic${this.props.epic.id}`).click();
    }
  };

  render() {
    const { epic, number, updateProjectEpic, changeUserType } = this.props;
    const { name, editing } = this.state;

    return (
      <div className="dragContainer" onDoubleClick={this.triggerModal}>
        <h3 onDoubleClick={this.handleEdit}>
          <span className={`number${editing ? " hidden" : ""}`}>
            {number > 9 ? number : "0" + number}:
          </span>
          <Form className="editChannel" onSubmit={this.submit}>
            <Input
              type="text"
              placeholder="Module name"
              name="name"
              value={name}
              ref={Input => (this.editInput = Input)}
              // onFocus={e => e.target.select()}
              disabled={!editing}
              onKeyUp={this.handleKeyboard}
              onBlur={this.submit}
              onChange={this.handleEdit}
              autoComplete="off"
              fluid
            />
            {(changeUserType === CLIENT || getUserType() === S_REDGUY) && (
              <button
                className={`editModule${editing ? " hidden" : ""}`}
                type="button"
                onClick={this.toggleEdit}
              >
                <img src="/images/edit.png" alt="Edit module" />
              </button>
            )}
          </Form>
        </h3>
        <div className="module">
          <h4>{this.renderDescription()}</h4>
          <p>{this.renderStory()}</p>
          <div>
            <div className="subline">
              <img src="/images/marker.png" alt="marker" />
              <span>Remote</span>
            </div>
            {epic.eta && (
              <div className="subline">
                <img src="/images/calendar.png" alt="calendar" />
                <span>
                  {epic.eta
                    .split("-")
                    .reverse()
                    .join("/")}
                </span>
              </div>
            )}
            <div className="subline">
              <img src="/images/dollar.png" alt="dollar" />
              <span>$20,000</span>
            </div>
            <div className="subline">
              <img src="/images/clock.png" alt="clock" />
              <span>4 weeks</span>
            </div>
          </div>
          {(changeUserType === CLIENT || getUserType() === S_REDGUY) && (
            <div className="dropdown">
              <a tabIndex="1" className="trigger">
                ...
              </a>
              <div className="menu">
                <div className="item">
                  <EditEpicModal
                    epic={epic}
                    open={this.state.modal}
                    number={number}
                    bindTrigger={this.bindTrigger}
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

  submit = () => {
    const {
      epic: { project_id, id, name },
      updateProjectEpic
    } = this.props;

    const data = {
      name: this.state.name,
      id,
      project_id
    };

    if (!!this.state.name) {
      updateProjectEpic(data);
    } else
      this.setState({
        name
      });

    this.setState({
      editing: false
    });
  };
}

export default connect(({ changeUserType }) => ({ changeUserType }), {
  deleteProjectEpic
})(Module);
