import React, { Component } from 'react';
import { Field } from 'redux-form';
import RenderStyledCheckbox from '../renders/RenderStyledCheckbox';
import StyledSpecialityArea from '../../../styleComponents/forms/StyledSpecialityArea'

class RenderSpecialityArea extends Component {

    render() {
        const { industry, speciality } = this.props;
        // console.log('speciality', speciality);
        window.industry = industry;
        window.speciality = speciality;
        let industry_id = industry ? industry.value : null;

        return (
            <StyledSpecialityArea>
                <p>Select your speciality within that area /</p>

                <div>
                    {speciality ? speciality[industry_id - 1]
                        ? speciality[industry_id - 1][industry_id] ?
                            speciality[industry_id - 1][industry_id].map(item =>
                            <Field
                                key = {item.value}
                                name={`speciality_ids._${item.value}`}
                                type="checkbox"
                                component={RenderStyledCheckbox}
                                label={item.label}
                            />)
                        : null : null : null
                    }
                </div>
            </StyledSpecialityArea>
        )
    }
}

export default RenderSpecialityArea
