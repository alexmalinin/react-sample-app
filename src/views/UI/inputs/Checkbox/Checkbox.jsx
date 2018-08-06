import React from "react";

import StyledError from "@styled/forms/Error";
import StyledRadio from "@styled/forms/Options";

const Checkbox = props => {
  let {
    input,
    label,
    disabled,
    meta: { touched, error, warning }
  } = props;

  return (
    <StyledRadio>
      <label>
        <input
          type="checkbox"
          className="ownInput"
          {...input}
          disabled={disabled}
        />
        <span className={`ownCheckbox`}>{label}</span>
      </label>
      {touched &&
        ((error && (
          <StyledError className="checkbox-error">{error}</StyledError>
        )) ||
          (warning && <span>{warning}</span>))}
    </StyledRadio>
  );
};

export default Checkbox;
