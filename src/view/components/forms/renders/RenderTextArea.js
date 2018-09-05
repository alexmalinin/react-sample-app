import React, { Component } from "react";
import classNames from "classnames";
import { TextArea } from "react-semantic-redux-form";
import StyledError from "../../../styleComponents/forms/StyledError";
import { StyledTextArea } from "../../../styleComponents/forms/StyledTextArea";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";

class RenderTextArea extends Component {
  state = {
    fullText: false
  };

  render() {
    const {
      input,
      placeholder,
      name,
      type,
      disabled,
      id,
      text,
      label,
      meta,
      meta: { touched, error, warning },
      className,
      large,
      isRequired,
      padded,
      paddedError,
      ...rest
    } = this.props;

    const textareaClass = classNames({ error: touched && error });

    return (
      <StyledTextArea className={className} large={large} padded={padded}>
        <label htmlFor={input.name} className="textarea-label">
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <TextArea
          {...input}
          meta={meta}
          className={textareaClass}
          autoHeight
          value={input.value}
          name={input.name}
          placeholder={placeholder}
          id={id}
          {...rest}
        />
        {touched &&
          ((error && (
            <StyledError paddedError={paddedError}>{error}</StyledError>
          )) ||
            (warning && <span>{warning}</span>))}
      </StyledTextArea>
    );
  }
}

export default RenderTextArea;
