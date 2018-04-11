import React, { Component } from 'react';
import StyledError from '../../../styleComponents/forms/StyledError'
import { StyledTextArea } from '../../../styleComponents/forms/StyledTextArea'


class RenderTextArea extends Component {
    autoresize = (event) => {
        const {large, className} = this.props;
        const textarea = event.target;
        const minHeight = large ? 108 : 72;
        console.log(textarea.scrollHeight)

        if(className === 'area'){
            setTimeout(() => {
                textarea.style.cssText = `height: ${minHeight}px`;
                if(textarea.scrollHeight > minHeight){
                    textarea.style.cssText = `height: ${Math.ceil(textarea.scrollHeight / 36) * 36}px`;
                }
            }, 0);
        }
    }

    render() {
        const {
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
        } = this.props;

        return (
            <StyledTextArea className={className} large={large} padded={padded}>
                <p>{label}</p>
                <textarea
                    {...input}
                    name={input.name}
                    placeholder={placeholder}
                    onKeyDown={this.autoresize}
                    id={id}/>
                {touched &&
                    ((error &&
                        <StyledError>
                            {error}
                        </StyledError>) ||
                    (warning &&
                        <span>
                            {warning}
                        </span>)
                    )}
            </StyledTextArea>
        )
    }
}


export default RenderTextArea;
