import React from "react";
import { required } from "../../../helpers/validate";
import InputField from "./InputField";

const LocationField = () => {
  return (
    <div id="city">
      <span id="country" />
      <InputField name="country" label="Country" />
      <InputField name="city" label="City" />
    </div>
  );
};

export default LocationField;
