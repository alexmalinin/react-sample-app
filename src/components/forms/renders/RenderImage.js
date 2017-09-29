import React from 'react';
import { Button } from 'semantic-ui-react'
import StyledUploader from '../../../styleComponents/forms/StyledUploader'

class RenderImage extends React.Component {

    state = { file: '', imagePreviewUrl: '' };


    // _handleSubmit(e) {
    //     e.preventDefault();
    //     console.log('handle uploading-', this.state.file);
    // }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        this.props.input.onChange(e);

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {

        let {
            input,
            placeholder,
            name,
            type,
            disabled,
            meta: { touched, error, warning }
        } = this.props;

        let { value, onChange, onFocus, onBlur } = input;

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className="preloader"><img src="../../images/undefUser.png" alt=""/></div>);
        }
        return (
            <StyledUploader>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
                <Button primary onClick={this.handleTrigger}>Upload</Button>
                <input
                    ref={this.triggerRef}
                    name={name}
                    disabled={disabled}
                    placeholder={placeholder}
                    type={type}
                    onChange={(e) => this._handleImageChange(e)}/>
                {/*<button className="submitButton"*/}
                {/*type="submit"*/}
                {/*onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>*/}

            </StyledUploader>
        )
    }

    triggerRef = ref => {
        this.container = ref;
    }

    handleTrigger = ev => {
        this.container.click();
    }
}

export default RenderImage;