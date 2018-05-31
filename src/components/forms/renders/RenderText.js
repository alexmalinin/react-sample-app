import React, { Component } from "react";
import StyledError from "../../../styleComponents/forms/StyledError";
import { StyledTextArea } from "../../../styleComponents/forms/StyledTextArea";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import { TextArea } from "react-semantic-redux-form/dist";

class RenderText extends Component {
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
          rows="1"
          spellCheck="false"
          onKeyDown={e => e.keyCode === 27 && e.target.blur()}
          onFocus={e => (e.target.spellcheck = true)}
          onBlur={e => (e.target.spellcheck = false)}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledTextArea>
    );
  }
}

export default RenderText;
