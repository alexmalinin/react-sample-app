import React from 'react';
import StyledError from '../../../styleComponents/forms/StyledError'
import { StyledTextArea } from '../../../styleComponents/forms/StyledTextArea'


const RenderTextArea = ({
                                input,
                                placeholder,
                                name,
                                type,
                                disabled,
                                id,
                                text,
                                label,
                                meta: { touched, error, warning }
                            }) =>
    <StyledTextArea>
        <p>{label}</p>
        <textarea {...input} name={name} placeholder={placeholder} id={id}/>
        {touched &&
        ((error &&
            <StyledError>
        {error}
      </StyledError>) ||
            (warning &&
                <span>
          {warning}
        </span>))}
    </StyledTextArea>;

export default RenderTextArea;
