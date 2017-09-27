import { TextArea } from 'semantic-ui-react';
import React from 'react';

const RenderTextArea = ({
                                input,
                                placeholder,
                                name,
                                type,
                                disabled,
                                meta: { touched, error, warning }
                            }) =>
    <div>
        <div>
            <TextArea {...input} name={name} placeholder={placeholder} />
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

export default RenderTextArea;