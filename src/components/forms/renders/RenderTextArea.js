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
                                meta: { touched, error, warning },
                                className,
                                large,
                                padded,
                                handleFormField
                            }) =>
    <StyledTextArea className={className} large={large} padded={padded}>
        <p>{label}</p>
        <textarea {...input} name={input.name} placeholder={placeholder} id={id} onBlur={handleFormField} />
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
