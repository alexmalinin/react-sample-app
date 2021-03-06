import React from "react";
import StyledError from "../../../styleComponents/forms/StyledError";

export const RenderField = ({
  input,
  placeholder,
  name,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <input {...input} name={name} placeholder={placeholder} type={type} />
      {touched &&
        ((error && <StyledError>{error}</StyledError>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
