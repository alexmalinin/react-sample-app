import React from "react";
import { Field } from "redux-form";
import { required, minLength2 } from "../../../helpers/validate";
import RenderRadio from "./RenderRadio";

const InputRadio = props => {
  const {
    name,
    placeholder,
    value,
    disabled,
    validate,
    checked,
    onChange
  } = props;
  // console.log('inputRadio', props);

  return (
    <Field
      name={name}
      component={RenderRadio}
      type="radio"
      label={placeholder}
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default InputRadio;
