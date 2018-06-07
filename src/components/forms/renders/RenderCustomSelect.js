import React, { Component } from "react";
import "react-select/dist/react-select.css";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import { Select } from "react-semantic-redux-form/dist";

export default class RenderCustomSelect extends Component {
  render() {
    let {
      input,
      meta,
      label,
      small,
      isRequired,
      placeholder,
      handleSubmit,
      options,
      ...rest
    } = this.props;

    const { touched, error, warning } = meta;

    return (
      <StyledInputs {...rest} small={small}>
        <label>
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <Select
          input={input}
          meta={meta}
          placeholder={placeholder}
          value={input.value}
          options={options}
          {...rest}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}
