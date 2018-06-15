import React from "react";
import { Field } from "redux-form";
import { minLength2 } from "../../../helpers/validate";
import StyledLabel from "../../../styleComponents/forms/StyledLabel";
import RenderField from "./RenderField";
import { createNumberMask, createTextMask } from "redux-form-input-masks";

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
      creditCard,
      ...rest
    } = this.props;
    let mask = {};

    if (creditCard) {
      mask = createTextMask({
        pattern: "9999 9999 9999 9999",
        guide: false,
        allowEmpty: true
      });
    }

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
          {...mask}
        />
      </div>
    );
  }
}

export default InputField;
