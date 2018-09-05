import React from "react";
import { submit } from "redux-form";

import StyledInputs from "@styled/forms/Inputs";
import StyledError from "@styled/forms/Validation";
import StyledDropdown from "./StyledDropdown";
import StyledLabel from "@styled/forms/Label";

const SelectField = ({
  meta,
  meta: { touched, error, warning, dispatch, form },
  input,
  label,
  small,
  onOpen,
  isRequired,
  selfSubmit,
  ...rest
}) => {
  const { value } = input;

  return (
    <StyledInputs {...rest} small={small}>
      <label>
        {label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
      </label>
      <StyledDropdown
        input={input}
        error={Boolean(touched && error)}
        value={value}
        meta={meta}
        onOpen={onOpen}
        onBlur={(e, data) => {
          !error && selfSubmit && dispatch(submit(form));
        }}
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
