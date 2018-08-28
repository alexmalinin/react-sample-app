import React from "react";

import StyledInputs from "@styled/forms/Inputs";
import StyledError from "@styled/forms/Validation";
import StyledDropdown from "./StyledDropdown";
import StyledLabel from "@styled/forms/Label";

const SelectField = ({
  meta: { touched, error, warning },
  input,
  label,
  small,
  onOpen,
  isRequired,
  ...rest
}) => {
  const { value } = input;

  return (
    <StyledInputs {...rest} small={small}>
      <label>
        {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
      </label>
      <StyledDropdown
        error={Boolean(touched && error)}
        value={value}
        onChange={(param, data) => input.onChange(data.value)}
        onOpen={onOpen}
        selection
        fluid
        {...rest}
      />
      {touched &&
        ((error && <StyledError>{error}</StyledError>) ||
          (warning && <span>{warning}</span>))}
    </StyledInputs>
  );
};

export default SelectField;
