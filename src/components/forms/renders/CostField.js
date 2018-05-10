import React from "react";
import { Field } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderField from "./RenderField";

const EmailField = props => {
  const {
    name,
    placeholder,
    disabled,
    label,
    data,
    checkedClass,
    onBlur,
    padded
  } = props;

  return (
    <div className="cost">
      <Field
        name={name}
        checkedClass={checkedClass}
        type="number"
        placeholder={placeholder}
        label={label}
        component={RenderField}
        validate={[required]}
        disabled={disabled}
        data={data}
        padded={padded}
        step="0.01"
        min="0"
        pattern="\d{1,5}.\d{2}"
        cost
        onBlur={onBlur}
      />
    </div>
  );
};

export default EmailField;
