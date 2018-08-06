import React from "react";
import { Field } from "redux-form";

import RenderRadio from "@UI/inputs/Radio";

import StyledCheckboxGroup from "./StyledCheckboxGroup";

const Availability = () => (
  <StyledCheckboxGroup>
    <label>Availability</label>
    <div className="checkbox-group">
      <Field
        name="availability"
        component={RenderRadio}
        type="radio"
        label="Full Time"
        value="Full Time"
      />
      <Field
        name="availability"
        component={RenderRadio}
        type="radio"
        label="Part Time"
        value="Part Time"
      />
      <Field
        name="availability"
        component={RenderRadio}
        type="radio"
        label="Not available"
        value="Not available"
      />
    </div>
  </StyledCheckboxGroup>
);

export default Availability;
