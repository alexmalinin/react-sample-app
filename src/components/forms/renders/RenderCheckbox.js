import React, { Component } from "react";
import { Checkbox } from "semantic-ui-react";
import StyledError from "../../../styleComponents/forms/StyledError";

class RenderCheckbox extends Component {
  render() {
    let {
      input,
      label,
      disabled,
      meta: { touched, error, warning }
    } = this.props;
    let { onFocus, onBlur } = input;

    return (
      <div>
        <Checkbox
          onFocus={onFocus}
          onBlur={onBlur}
          label={label}
          disabled={disabled}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  }
}

export default RenderCheckbox;
