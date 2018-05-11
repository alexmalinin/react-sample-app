import { Input } from "semantic-ui-react";
import React from "react";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";

class RenderField extends React.Component {
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
      step
    } = this.props;

    const className = !error ? checkedClass : "";

    return (
      <StyledInputs className={this.props.className} padded={padded}>
        <label htmlFor={name}>{label}</label>
        <Input
          error={Boolean(touched && error)}
          {...input}
          name={input.name}
          className={className}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          min={min}
          pattern={pattern}
          step={step}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}

export default RenderField;
