import { Input } from 'semantic-ui-react';
import React from 'react';

export const renderField = ({
                         input,
                         placeholder,
                         type,
                         meta: { touched, error, warning }
                     }) =>
    <div>
        <div>
            <Input {...input} placeholder={placeholder} type={type} />
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