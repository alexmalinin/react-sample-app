import React, { Component } from 'react';
import { Field } from 'redux-form';
import { speciality } from '../../../helpers/selects/speciality';
import RenderStyledCheckbox from '../renders/RenderStyledCheckbox';
import StyledSpecialityArea from '../../../styleComponents/forms/StyledSpecialityArea'

class RenderSpecialityArea extends Component {

    render() {
        return (
            <StyledSpecialityArea>
                <p>Select your speciality within that area /</p>

                <div>
                    {speciality
                        ? speciality.map(item =>
                            <Field
                                name={`skills.${item.label}`}
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
