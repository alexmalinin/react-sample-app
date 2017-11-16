import { TextArea } from 'semantic-ui-react';
import React from 'react';
import StyledError from '../../../styleComponents/forms/StyledError'
import StyledTextArea from '../../../styleComponents/forms/StyledTextArea'


const RenderTextArea = ({
                                input,
                                placeholder,
                                name,
                                type,
                                disabled,
                                text,
                                meta: { touched, error, warning }
                            }) =>
    <StyledTextArea>
        <textarea {...input} name={name} placeholder={placeholder}/>
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
