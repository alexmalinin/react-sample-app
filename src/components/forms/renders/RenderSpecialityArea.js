import React, { Component } from 'react';
import { Field } from 'redux-form';
import { speciality } from '../../../helpers/selects/speciality';
import RenderStyledCheckbox from '../renders/RenderStyledCheckbox';
import StyledSpecialityArea from '../../../styleComponents/forms/StyledSpecialityArea'

class RenderSpecialityArea extends Component {

    render() {
        const { industry } = this.props;

        return (
            <StyledSpecialityArea>
                <p>Select your speciality within that area /</p>

                <div>
                    {industry
                        ? speciality[industry.value].map(item =>
                            <Field
                                key = {item.label}
                                name={`speciality_ids.${item.label}`}
                                component={RenderStyledCheckbox}
                                label={item.label}
                                value={item.value}
                            />)
                        : null
                    }
                </div>
            </StyledSpecialityArea>
        )
    }
}

export default RenderSpecialityArea
