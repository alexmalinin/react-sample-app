import React, { Component } from 'react';
import { Field } from 'redux-form';
import RenderMultiSelect from '../renders/RenderMultiSelect';
import StyledSkillsArea from '../../../styleComponents/forms/StyledSkillsArea'

class RenderSkillsArea extends Component {

    render() {
        return (
            <StyledSkillsArea>
                <span>Enter your skills here /</span>
                <Field
                    name="custom-skills"
                    component={RenderMultiSelect}
                    placeholder=""
                />
            </StyledSkillsArea>
        );
    }
}

export default RenderSkillsArea;
