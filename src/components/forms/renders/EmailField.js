import React from "react";
import { Field } from "redux-form";
import { required, email } from "../../../helpers/validate";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import RenderField from "./RenderField";

const EmailField = props => {
  const {
    name,
    placeholder,
    disabled,
    label,
    data,
    checkedClass,
    isRequired,
    ...rest
  } = props;

  return (
    <div>
      <Field
        name={name}
        checkedClass={checkedClass}
        type="email"
        placeholder={placeholder}
        label={label && isRequired ? <StyledLabel>{label}</StyledLabel> : label}
        component={RenderField}
        validate={[required, email]}
        disabled={disabled}
        data={data}
        {...rest}
      />
    </div>
  );
};

export default EmailField;
