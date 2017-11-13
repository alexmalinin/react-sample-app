import React from 'react';
import StyledCheckbox from '../../../styleComponents/forms/StyledCheckbox'
const GetCustomSkills = ( { skills } ) => {

    return (
        <StyledCheckbox indentBot>
            <p>Your Skillset includes /</p>

            {skills && skills.map((item, index ) => {
                return (
                    <div key={item.name + index}>
                        {item.name}
                    </div>
                )
            })}
        </StyledCheckbox>
    )
};

export default GetCustomSkills;
