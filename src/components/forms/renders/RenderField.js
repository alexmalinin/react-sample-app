import { Input } from 'semantic-ui-react';
import React from 'react';

export const RenderField = ({
                         input,
                         placeholder,
                            name,
                         type,
                            disabled,
                         meta: { touched, error, warning }
                     }) =>
    <div>
        <div>
            <Input {...input} name={name} disabled={disabled} placeholder={placeholder} type={type} />
            {touched &&
            ((error &&
                <span>
            {error}
          </span>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
        </div>
    </div>;