import React, { Component } from "react";
import { connect } from "react-redux";
import { reset, change, initialize } from "redux-form";
import StyledError from "../../../styleComponents/forms/StyledError";
import { StyledTextArea } from "../../../styleComponents/forms/StyledTextArea";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import { TextArea } from "react-semantic-redux-form/dist";
import { Button } from "semantic-ui-react";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";
import {
  showProjectWithId,
  showAllProjects,
  showSpecialistProjects
} from "../../../actions/actions";
import { getUserRole } from "../../../helpers/functions";
import { CUSTOMER } from "../../../constans/constans";

class RenderText extends Component {
  state = {
    editing: false,
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

    if (this.props.onSelfSubmit) {
      this.setState({ editing: true });
    }
  };

  blur = e => {
    e.target.spellcheck = false;
    if (this.props.meta.pristine) {
      this.setState({ editing: false });
    }
  };

  //TODO: apply thunk here
  submit = e => {
    const {
      onSelfSubmit,
      input: { name, value },
      meta: { dispatch, form },
      projectId,
      updateProjects
    } = this.props;

    this.setState({ loading: true });

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

        if (projectId) {
          this.props.showProjectWithId(projectId);
        }

        if (updateProjects) {
          if (getUserRole() === CUSTOMER) {
            this.props.showAllProjects();
          } else {
            this.props.showSpecialistProjects();
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, updError: true });
      });
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error, warning, pristine },
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

    return (
      <StyledTextArea
        className={className}
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
          onFocus={this.focus}
          onBlur={this.blur}
          disabled={disabled}
        />
        {editing && (
          <div className="controls">
            <Button
              type="button"
              className="save"
              disabled={pristine}
              loading={loading}
              onClick={this.submit}
            >
              Save
            </Button>
            <Button type="button" className="cancel" onClick={this.clear}>
              Cancel
            </Button>
          </div>
        )}
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledTextArea>
    );
  }
}

export default connect(null, {
  showProjectWithId,
  showAllProjects,
  showSpecialistProjects
})(RenderText);

// export default RenderText;
