import { Input } from 'semantic-ui-react';
import React from 'react';

export const RenderField = ({
                                input,
                                placeholder,
                                name,
                                type,
                                meta: { touched, error, warning }
                            }) =>
    <div>
        <div>
            <input {...input} name={name} placeholder={placeholder} type={type} />
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