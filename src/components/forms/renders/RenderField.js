import { Input } from 'semantic-ui-react';
import React from 'react';
import StyledInputs from '../../../styleComponents/forms/StyledInputs'
import StyledError from '../../../styleComponents/forms/StyledError'

export const RenderField = ({
                         input,
                         placeholder,
                            name,
                            label,
                         type,
                            disabled,
                         meta: { touched, error, warning }
                     }) =>
    <StyledInputs>
            <label htmlFor={name}>{label}</label>
            <Input error={Boolean(touched && error)} {...input} name={name} disabled={disabled} placeholder={placeholder} type={type} />
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