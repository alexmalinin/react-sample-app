import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteProjectEpic,
  showAllEpics,
  updateProjectEpic
} from "../../actions/actions";
import { Form, Input } from "semantic-ui-react";
import { S_REDGUY, CUSTOMER } from "../../constants/user";
import { getUserRole, oneOfRoles } from "../../helpers/functions";
import { formatCurrency } from "../../helpers/validate";

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

    if (description && description.length > 70) {
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

  render() {
    const { epic, number, history, project } = this.props;
    const { name, editing } = this.state;

    return (
      <div className="dragContainer">
        <h3 onDoubleClick={getUserRole() === S_REDGUY ? this.toggleEdit : null}>
          <span className={`number${editing ? " hidden" : ""}`}>
            {String(number).padStart(2, 0)}:
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
            {oneOfRoles(S_REDGUY, CUSTOMER) && (
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
        <div
          className="module"
          onClick={() => {
            history.push(`/dashboard/project/${project}/module/${number}/edit`);
          }}
        >
          <h4>{this.renderDescription()}</h4>
          <p>{this.renderStory()}</p>
          <div>
            {epic.eta && (
              <div className="subline">
                <div className="subline-icon">
                  <i className="fas fa-calendar-alt" />
                </div>
                <span>
                  {epic.eta
                    .split("-")
                    .reverse()
                    .join("/")}
                </span>
              </div>
            )}
            {oneOfRoles(S_REDGUY, CUSTOMER) && (
              <div className="subline">
                <div className="subline-icon">
                  <i className="fas fa-dollar-sign" />
                </div>
                <span>{formatCurrency(epic.cost)}</span>
              </div>
            )}
          </div>
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
