import React from "react";
import { Field } from "redux-form";

import RenderMultiSelect from "./RenderMultiSelect";
import StyledMultiSelect from "./StyledMultiSelect";

const MultiSelect = ({
  handleSelectChange,
  options,
  onOpen,
  label,
  name,
  padded,
  placeholder,
  className
}) => {
  return (
    <StyledMultiSelect
      className={className}
      padded={padded}
      // placeholder={placeholder}
    >
      <label htmlFor={name}>{label}</label>

      <Field
        name={name}
        component={RenderMultiSelect}
        onChange={e => handleSelectChange && handleSelectChange(e, name)}
        placeholder={placeholder}
        onOpen={onOpen}
        options={options}
        // disabled
      />
    </StyledMultiSelect>
  );
};

export default MultiSelect;
