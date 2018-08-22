import React, { Component } from "react";
import { change } from "redux-form";
import { TextArea } from "react-semantic-redux-form/dist";
import classNames from "classnames";

import StyledTextArea from "../StyledTextArea";
import StyledError from "@styled/forms/Validation";
import StyledLabel from "@styled/forms/Label";

import { taskStatuses } from "@views/utils/selects";

class AsyncTextArea extends Component {
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
      meta: { dispatch, form, error }
    } = this.props;

    this.setState({ loading: true });

    input.onBlur(input.value);

    !error &&
      onSelfSubmit(name, value)
        .then(data => {
          if (data.state && typeof data.state === "number") {
            data.state = taskStatuses.find(
              status => status.enum === data.state
            ).value;
          }
          this.setState({ loading: false, updError: false, editing: false });

          dispatch(change(form, name, data[name]));
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

export default AsyncTextArea;
