import { Input } from "semantic-ui-react";
import React, { Component } from "react";
import { initialize } from "redux-form";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import { taskStatuses } from "../../../helpers/selects/taskStatuses";

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
      input
    } = this.props;
    if (dirty && onSelfSubmit && !error) {
      this.setState({ loading: true });
      onSelfSubmit(input.name, e.target.value)
        .then(resp => {
          const { data } = resp;
          if (data.state) {
            data.state = taskStatuses.find(
              status => status.enum === data.state
            ).value;
          }
          this.setState({ loading: false, updError: false });
          dispatch(initialize(form, data));
        })
        .catch(error => this.setState({ loading: false, updError: true }));
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
      autoComplete,
      onSelfSubmit,
      ...rest
    } = this.props;
    const { loading, updError } = this.state;

    const className = !error ? checkedClass : "";

    return (
      <StyledInputs className={this.props.className} padded={padded}>
        <label htmlFor={name}>
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <Input
          error={Boolean(touched && error) || updError}
          {...input}
          name={input.name}
          className={className}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          min={min}
          pattern={pattern}
          step={step}
          autoComplete={autoComplete || "off"}
          onKeyDown={this.keyDown}
          // onFocus={e => {
          //   this.setState({ updError: false });
          //   input.onFocus();
          // }}
          onBlur={this.submit}
          loading={loading}
          {...rest}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}

export default RenderField;
