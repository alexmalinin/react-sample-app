import React, { Component } from "react";
import StyledError from "../../../styleComponents/forms/StyledError";
import { StyledTextArea } from "../../../styleComponents/forms/StyledTextArea";

class RenderTextArea extends Component {
  state = {
    fullText: false
  };

  autoresize = (event, text) => {
    const { large, className } = this.props;
    const textarea = event.target;
    const minHeight = large ? 108 : 72;

    if (className === "area") {
      if (text) {
        setTimeout(() => {
          textarea.style.cssText = `height: ${minHeight}px`;
          if (textarea.scrollHeight > minHeight) {
            textarea.style.cssText = `height: ${Math.ceil(
              textarea.scrollHeight / 36
            ) * 36}px`;
          }
        }, 0);
        this.setState({ fullText: true });
      } else {
        setTimeout(() => {
          textarea.style.cssText = `height: ${minHeight}px`;
        }, 0);
        this.setState({ fullText: false });
      }
    }
  };

  renderDescription = value => {
    if (value) {
      if (value.length > 80) {
        return value.slice(0, 80) + "...";
      } else return value;
    }
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
      meta: { touched, error, warning },
      className,
      large,
      padded
    } = this.props;

    return (
      <StyledTextArea className={className} large={large} padded={padded}>
        <p>{label}</p>
        <textarea
          {...input}
          value={
            this.state.fullText
              ? input.value
              : this.renderDescription(input.value)
          }
          name={input.name}
          placeholder={placeholder}
          onFocus={e => this.autoresize(e, true)}
          onBlur={e => this.autoresize(e, false)}
          id={id}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledTextArea>
    );
  }
}

export default RenderTextArea;
