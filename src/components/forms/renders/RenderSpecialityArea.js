import React, { Component } from 'react';
import { Field } from 'redux-form';
import { speciality } from '../../../helpers/selects/speciality';
import RenderStyledCheckbox from '../renders/RenderStyledCheckbox';
import StyledSpecialityArea from '../../../styleComponents/forms/StyledSpecialityArea'

class RenderSpecialityArea extends Component {

    render() {
        const { industry = [], speciality = [] } = this.props;
        let { value } = industry;
        let id = speciality.map( item => Object.keys(item)[0] ).filter( item => item == value);
        let chosen = speciality.filter( item => Object.keys(item) == value);

        return (
            <StyledSpecialityArea>
                <p>Select your speciality within that area /</p>

                <div>
                    {chosen[0]
                        ? chosen[0][id].map(item =>
                            <Field
                                key = {item.label}
                                name={`speciality_ids.${item.value}`}
                                component={RenderStyledCheckbox}
                                label={item.label}
                            />)
                        : null
                    }
                </div>
            </StyledSpecialityArea>
        )
    }
}

export default RenderSpecialityArea
