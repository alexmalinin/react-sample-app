import React, { Component } from "react";
import { Field } from "redux-form";
import RenderMultiSelect from "../renders/RenderMultiSelect";
import StyledSkillsArea from "../../../styleComponents/forms/StyledSkillsArea";

class RenderSkillsArea extends Component {
  render() {
    const { handleSelectChange, options, onOpen } = this.props;
    return (
      <StyledSkillsArea>
        <span>Enter your skills here</span>
        <Field
          name="skills_attributes"
          component={RenderMultiSelect}
          onChange={e => handleSelectChange(e, "skills_attributes")}
          // placeholder="Start type your skill..."
          placeholder=""
          onOpen={onOpen}
          options={options}
        />
      </StyledSkillsArea>
    );
  }
}

export default RenderSkillsArea;
