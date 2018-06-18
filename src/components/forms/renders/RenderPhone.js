import React from "react";
import { Field } from "redux-form";
import RenderPhoneField from "./RenderPhoneField";
import { required } from "../../../helpers/validate";

const RenderPhone = ({ value, ...rest }) => (
  <Field
    name="phone_number"
    label="Phone"
    component={RenderPhoneField}
    placeholder="Enter phone number"
    value={value}
    validate={[required]}
    isRequired
    {...rest}
  />
);

export default RenderPhone;
