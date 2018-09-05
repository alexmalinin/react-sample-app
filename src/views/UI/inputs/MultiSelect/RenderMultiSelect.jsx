import React from "react";
import Select from "react-select";

import "react-select/dist/react-select.css";

const RenderMultiSelect = ({
  meta: { touched, error, warning },
  input,
  ...rest
}) => {
  let { value, onChange } = input;

  return (
    <div>
      <Select
        value={value}
        onChange={onChange}
        multi={true}
        openOnFocus={true}
        {...rest}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export default RenderMultiSelect;
