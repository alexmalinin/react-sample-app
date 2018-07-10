import React, { Component } from "react";
import { connect } from "react-redux";
import { initialize } from "redux-form";
import { Input } from "semantic-ui-react";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";
import {
  showProjectWithId,
  showProjectEpic,
  showSortedProjects
} from "../../../actions/actions";
import { getUserType } from "../../../helpers/functions";
import { CLIENT, SPECIALIST } from "../../../constants/user";

class RenderField extends Component {
  state = {
    loading: false,
    updError: false
  };

  //TODO: apply thunk here
  keyDown = e => {
    const { onSelfSubmit } = this.props;
    if (e.keyCode === 13) {
      if (onSelfSubmit) {
        this.submit(e);
      }
      e.target.blur();
    }
  };

  submit = e => {
    const {
      meta: { dirty, dispatch, form, error },
      onSelfSubmit,
      input,
      updateProject,
      projectId,
      updateEpic,
      epicId,
      updateProjects
    } = this.props;

    input.onBlur(input.value);

    if (dirty && onSelfSubmit && !error) {
      this.setState({ loading: true });
      onSelfSubmit(input.name, e.target.value)
        .then(resp => {
          const { data } = resp;
          if (data.state) {
            data.state = taskStatuses.find(
              status => status.enum === data.state
            );

            data.state = data.state && data.state.value;
          }
          this.setState({ loading: false, updError: false });
          dispatch(initialize(form, data));

          if (updateProject && projectId) {
            this.props.showProjectWithId(projectId);
          }

          if (updateEpic && projectId && epicId) {
            this.props.showProjectEpic(projectId, epicId);
          }

          if (updateProjects) {
            const userType = getUserType();
            if (userType === CLIENT) this.props.showSortedProjects("customers");
            else if (userType === SPECIALIST)
              this.props.showSortedProjects("specialists");
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ loading: false, updError: true });
        });
    }
  };

  render() {
    const {
      input,
      placeholder,
      name,
      label,
      type,
      disabled,
      padded,
      meta: { touched, error, warning },
      checkedClass,
      min,
      pattern,
      isRequired,
      step,
<<<<<<< cffb0315402d21ed6bd9ab6f9fccde4609ce3012
      autoComplete,
      onSelfSubmit,
      className
=======
      autoComplete
      //to prevent warning => they r in ...rest
      //not sure to use connect on render field => may b should use callbacks
>>>>>>> [Refactor] JWT refactor to new api
    } = this.props;

    const { loading, updError } = this.state;

    const customClassName = !error ? checkedClass : "";

    return (
      <StyledInputs className={className} padded={padded}>
        <label htmlFor={name}>
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <Input
          error={Boolean(touched && error) || updError}
          {...input}
          name={input.name}
          className={customClassName}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          min={min}
          pattern={pattern}
          step={step}
          autoComplete={autoComplete || "off"}
          onKeyUp={this.keyDown}
          onBlur={this.submit}
          // onBlur={() => input.onBlur(input.value)}
          loading={loading}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}

export default connect(null, {
  showProjectWithId,
  showProjectEpic,
  showSortedProjects
})(RenderField);
