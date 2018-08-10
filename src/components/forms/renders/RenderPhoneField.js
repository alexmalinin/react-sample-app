import React from "react";
import Phone from "react-phone-number-input";
import StyledInputs from "../../../styleComponents/forms/StyledInputs";
import StyledError from "../../../styleComponents/forms/StyledError";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import "react-phone-number-input/rrui.css";
import "react-phone-number-input/style.css";

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
      isRequired,
      step,
      ...rest
    } = this.props;

    const className = !error ? checkedClass : "";

    return (
      <StyledInputs className={this.props.className} padded={padded}>
        <label htmlFor={name}>
          {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        </label>
        <Phone
          {...input}
          name={input.name}
          className={className}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          min={min}
          pattern={pattern}
          step={step}
          {...rest}
        />
        {touched &&
          ((error && <StyledError>{error}</StyledError>) ||
            (warning && <span>{warning}</span>))}
      </StyledInputs>
    );
  }
}

export default RenderField;
