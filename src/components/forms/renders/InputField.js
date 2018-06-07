import React from "react";
import { Field } from "redux-form";
import { minLength2 } from "../../../helpers/validate";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import RenderField from "./RenderField";

class InputField extends React.Component {
  render() {
    const {
      name,
      placeholder,
      disabled,
      validate,
      label,
      padded,
      data,
      isRequired,
      ...rest
    } = this.props;

    return (
      <div>
        <Field
          name={name}
          type="text"
          placeholder={placeholder}
          label={
            label && isRequired ? <StyledLabel>{label}</StyledLabel> : label
          }
          component={RenderField}
          disabled={disabled}
          {...rest}
          padded={padded}
          validate={validate ? [...validate, minLength2] : []}
          data={data}
        />
      </div>
    );
  }
}

export default InputField;
