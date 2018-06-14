import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteProjectEpic,
  showAllEpics,
  updateProjectEpic
} from "../../actions/actions";
import { Form, Input, Message } from "semantic-ui-react";
import EditEpicModal from "../modals/EditEpicModal";
import { S_CORE, S_REDGUY, CUSTOMER } from "../../constans/constans";
import { getUserRole, oneOfRoles } from "../../helpers/functions";
import { S_Message } from "../../styleComponents/layout/S_Message";

class Module extends Component {
  state = {
    dropdown: false,
    name: this.props.epic.name,
    editing: false,
    modal: false
  };

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

  deleteEpic = e => {
    e.stopPropagation();
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

  renderMessage = () => {
    this.setState({ renderMessage: true });
    setTimeout(
      () =>
        this.setState({
          renderMessage: false,
          renderErrorMessage: false
        }),
      2500
    );
  };

  renderErrorMessage = () => {
    this.setState({ renderErrorMessage: true });
    setTimeout(
      () =>
        this.setState({
          renderMessage: false,
          renderErrorMessage: false
        }),
      2500
    );
  };

  openModal = () => {
    this.editEpicModal.open();
  };

  render() {
    const { epic, number, showAllEpics } = this.props;
    const {
      name,
      editing,
      dropdown,
      renderMessage,
      renderErrorMessage
    } = this.state;

    return (
      <div className="dragContainer">
        <h3 onDoubleClick={getUserRole() === S_REDGUY ? this.toggleEdit : null}>
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
            {oneOfRoles(S_REDGUY) && (
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
        <div className="module" onClick={this.openModal}>
          <h4>{this.renderDescription()}</h4>
          <p>{this.renderStory()}</p>
          <div>
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
          </div>
          {oneOfRoles(S_REDGUY) && (
            <div className="dropdown">
              <a
                tabIndex="-1"
                className="trigger"
                onClick={e => {
                  e.stopPropagation();
                  this.setState({ dropdown: !this.state.dropdown });
                }}
                onBlur={e => this.setState({ dropdown: false })}
              >
                ...
              </a>
              <div className={`menu${dropdown ? " open" : ""}`}>
                <div className="item">
                  <div>Edit</div>
                </div>
                <div className="item">
                  <div onClick={this.deleteEpic}>Delete</div>
                </div>
              </div>
            </div>
          )}

          <EditEpicModal
            epic={epic}
            number={number}
            showAllEpics={showAllEpics}
            renderMessage={this.renderMessage}
            renderErrorMessage={this.renderErrorMessage}
            ref={ref => (this.editEpicModal = ref)}
          />

          <S_Message positive data-show={renderMessage}>
            <Message.Header>Success!</Message.Header>
            <p>{epic.name} updated</p>
          </S_Message>
          <S_Message negative formodal="true" data-show={renderErrorMessage}>
            <Message.Header>Error!</Message.Header>
            <p>Something went wrong, please try again</p>
          </S_Message>
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

export default connect(null, {
  deleteProjectEpic,
  showAllEpics,
  updateProjectEpic
})(Module);
