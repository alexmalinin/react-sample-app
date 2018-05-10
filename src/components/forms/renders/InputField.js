import React from "react";
import { Field } from "redux-form";
import { required, minLength2 } from "../../../helpers/validate";
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
      ...rest
    } = this.props;

    return (
      <div>
        <Field
          name={name}
          type="text"
          placeholder={placeholder}
          label={label}
          component={RenderField}
          disabled={disabled}
          {...rest}
          padded={padded}
          validate={validate ? [required, minLength2] : []}
          data={data}
        />
      </div>
    );
  }
}

export default InputField;
