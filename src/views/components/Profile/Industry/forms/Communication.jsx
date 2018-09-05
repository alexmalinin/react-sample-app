import React from "react";
import { Field } from "redux-form";

import RenderCheckbox from "@UI/inputs/Checkbox";
import StyledCheckboxGroup from "./StyledCheckboxGroup";

import { communications } from "../helpers/selects";

const Communication = () => (
  <StyledCheckboxGroup>
    <label>Preferred method of communication</label>
    <div className="checkbox-group">
      {communications.map(item => (
        <Field
          key={item}
          name={`communication_type.${item}`}
          component={RenderCheckbox}
          type="checkbox"
          label={item}
          value={item}
        />
      ))}
    </div>
  </StyledCheckboxGroup>
);

export default Communication;
