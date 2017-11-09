import React from 'react';
import StyledCheckbox from '../../../styleComponents/forms/StyledCheckbox'
import { DvTitleSmall } from '../../../styleComponents/layout/DvTitles'



const RenderChosenSpecialises = ( {specialities, title, area} ) => {

    return (
        <StyledCheckbox indentBot>
            <DvTitleSmall>What you’ve told us so far /</DvTitleSmall>
            <p>You are a <b>{ title }</b> working in
                <b> { area }</b> that specialises in
            </p>
            {specialities && specialities.map(item => {
                return (
                    <div key={item.name}>
                        {item.name}
                    </div>
                )
            })}
        </StyledCheckbox>
    )
};

export default RenderChosenSpecialises;
