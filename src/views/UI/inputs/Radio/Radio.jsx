import React from "react";
import StyledRadio from "@styled/forms/Options";

const RenderRadio = props => {
  const { input, label, checked, name, onChange } = props;

  let radioChecked = null;
  if (checked === undefined) {
    input.hasOwnProperty("checked") ? (radioChecked = input.checked) : null;
  }

  return (
    <StyledRadio>
      <label>
        <input
          className="ownInput"
          type="radio"
          name={name}
          {...input}
          checked={radioChecked === null ? checked : radioChecked}
        />
        <span className={`ownRadio`}>{label}</span>
      </label>
    </StyledRadio>
  );
};

export default RenderRadio;
