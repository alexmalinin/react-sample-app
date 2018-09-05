import React from "react";
import classNames from "classnames";
import { TextArea } from "react-semantic-redux-form";

import StyledError from "@styled/forms/Validation";
import StyledTextArea from "./StyledTextArea";
import StyledLabel from "@styled/forms/Label";

const RenderTextArea = ({
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
}) => {
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
};

export default RenderTextArea;
