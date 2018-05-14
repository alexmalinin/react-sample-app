import React, { Component } from "react";
import "react-select/dist/react-select.css";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";
import StyledSelect from "../../../styleComponents/forms/StyledSelect";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";

export default class RenderSelect extends Component {
  render() {
    let {
      meta: { touched, error, warning },
      input,
      label,
      small,
      isRequired,
      ...rest
    } = this.props;
    let { value, onChange } = input;

    return (
      <StyledInputs {...rest} small={small}>
        <label>
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <StyledSelect
          error={Boolean(touched && error)}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}
