import React, { Component } from "react";
import StyledError from "../../../styleComponents/forms/StyledError";
import { StyledTextArea } from "../../../styleComponents/forms/StyledTextArea";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";

class RenderTextArea extends Component {
  state = {
    fullText: false
  };

  // autoresize = event => {
  //   const { large, className } = this.props;
  //   const textarea = event.target;
  //   const minHeight = large ? 108 : 72;

  //   if (className === "area") {
  //     setTimeout(() => {
  //       textarea.style.cssText = `height: ${minHeight}px`;
  //       if (textarea.scrollHeight > minHeight) {
  //         textarea.style.cssText = `height: ${Math.ceil(
  //           textarea.scrollHeight / 36
  //         ) * 36}px`;
  //       }
  //     }, 0);
  //     this.setState({ fullText: true });
  //   }
  // };

  // renderDescription = value => {
  //   if (value) {
  //     if (value.length > 80) {
  //       return value.slice(0, 80) + "...";
  //     } else return value;
  //   }
  // };

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
      meta: { touched, error, warning },
      className,
      large,
      isRequired,
      padded,
      paddedError,
      ...rest
    } = this.props;

    return (
      <StyledTextArea className={className} large={large} padded={padded}>
        <label htmlFor={input.name} className="textarea-label">
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <textarea
          {...input}
          value={input.value}
          name={input.name}
          placeholder={placeholder}
          // onKeyDown={e => this.autoresize(e)}
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
