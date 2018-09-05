import React, { Component } from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
import classNames from "classnames";
import StyledError from "../../../styleComponents/forms/StyledError";
import { StyledTextArea } from "../../../styleComponents/forms/StyledTextArea";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import { TextArea } from "react-semantic-redux-form/dist";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";
import {
  showProjectWithId,
  showProjectEpic,
  showSortedProjects,
  showAllEpics
} from "../../../actions/actions";
import { getUserType } from "../../../helpers/functions";
import { CLIENT, SPECIALIST } from "../../../constants/user";

class RenderText extends Component {
  state = {
    // editing: false,
    loading: false,
    updError: false
  };

  clear = () => {
    const {
      meta: { dispatch, form, initial },
      input: { name }
    } = this.props;

    dispatch(change(form, name, initial));
    this.setState({ editing: false, updError: false });
  };

  keyDown = e => {
    e.keyCode === 27 && e.target.blur();
    !this.props.autoHeight && e.keyCode === 13 && console.log("enter");
  };

  focus = e => {
    e.target.spellcheck = true;
  };

  blur = e => {
    const {
      meta: { dirty }
    } = this.props;

    e.target.spellcheck = false;

    if (dirty) {
      this.submit(e);
    }
  };

  //TODO: apply thunk here
  submit = e => {
    const {
      onSelfSubmit,
      input,
      input: { name, value },
      meta: { dispatch, form, error },
      projectId,
      updateProject,
      updateProjects,
      showSortedProjects,
      epicId,
      updateEpic,
      updateEpicName
    } = this.props;

    this.setState({ loading: true });

    input.onBlur(input.value);

    !error &&
      onSelfSubmit(name, value)
        .then(resp => {
          const { data } = resp;
          if (data.state && typeof data.state === "number") {
            data.state = taskStatuses.find(
              status => status.enum === data.state
            ).value;
          }
          this.setState({ loading: false, updError: false, editing: false });
          dispatch(change(form, name, data[name]));

          if (updateProject && projectId) {
            this.props.showProjectWithId(projectId);
          }

          if (updateEpic && projectId && epicId) {
            this.props.showProjectEpic(projectId, epicId);
          }

          if (updateEpicName) {
            this.props.showAllEpics(projectId);
          }

          if (updateProjects) {
            const userType = getUserType();
            if (userType === CLIENT) showSortedProjects("customers");
            else if (userType === SPECIALIST) showSortedProjects("specialists");
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ loading: false, updError: true });
        });
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error, warning },
      meta,
      placeholder,
      className,
      large,
      isRequired,
      padded,
      autoHeight,
      disabled
    } = this.props;
    const { editing, loading, updError } = this.state;

    const textareaClass = classNames(className, { error: !!error });

    return (
      <StyledTextArea
        className={textareaClass}
        large={large}
        padded={padded}
        disabled={disabled}
      >
        <div className="textarea-label">
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </div>
        <TextArea
          {...input}
          placeholder={placeholder}
          meta={meta}
          autoHeight={autoHeight}
          className={`${editing ? "editing" : ""}${updError ? " error" : ""}`}
          rows="1"
          spellCheck="false"
          onKeyDown={this.keyDown}
          onKeyPress={e => console.log(e.charCode, e.keyCode, e.ctrlKey)}
          onFocus={this.focus}
          onBlur={this.blur}
          disabled={disabled}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledTextArea>
    );
  }
}

export default connect(null, {
  showProjectWithId,
  showProjectEpic,
  showSortedProjects,
  showAllEpics
})(RenderText);

// export default RenderText;
