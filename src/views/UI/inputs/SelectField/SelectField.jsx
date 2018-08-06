import React from "react";

import StyledInputs from "@styled/forms/Inputs";
import StyledError from "@styled/forms/Error";
import StyledSelect from "./StyledSelect";
import StyledLabel from "@styled/forms/Label";

import "react-select/dist/react-select.css";

const SelectField = ({
  meta: { touched, error, warning },
  input,
  label,
  small,
  onOpen,
  isLoading,
  isRequired,
  ...rest
}) => {
  const { value, onChange } = input;

  return (
    <StyledInputs {...rest} small={small} loading={isLoading}>
      <label>
        {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
      </label>
      <StyledSelect
        error={Boolean(touched && error)}
        value={value}
        onChange={onChange}
        onOpen={onOpen}
        isLoading={isLoading}
        {...rest}
      />
      {touched &&
        ((error && <StyledError>{error}</StyledError>) ||
          (warning && <span>{warning}</span>))}
    </StyledInputs>
  );
};

export default SelectField;
