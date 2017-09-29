import { Input } from 'semantic-ui-react';
import React from 'react';
import StyledInputs from '../../../styleComponents/StyledInputs'
import StyledError from '../../../styleComponents/StyledError'

export const RenderField = ({
                         input,
                         placeholder,
                            name,
                         type,
                            disabled,
                         meta: { touched, error, warning }
                     }) =>
    <StyledInputs>
            <Input {...input} name={name} disabled={disabled} placeholder={placeholder} type={type} />
            {touched &&
            ((error &&
                <StyledError>
            {error}
          </StyledError>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
    </StyledInputs>;