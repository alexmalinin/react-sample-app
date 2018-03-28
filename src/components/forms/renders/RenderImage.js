import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import StyledUploader from '../../../styleComponents/forms/StyledUploader';
import { PORT } from "../../../constans/constans";

class RenderImage extends Component {

    state = { file: '', imagePreviewUrl: '' };
    

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
        };

        reader.readAsDataURL(file)
    }

    render() {
        
        const {
            avatar,
            input,
            placeholder,
            name,
            type,
            disabled,
        } = this.props;

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (avatar && avatar.url && !imagePreviewUrl) {
            $imagePreview = (<img src={PORT + avatar.url}/>);
        } else if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className='preloader'><img src='../../images/uploadImg.png' alt=''/></div>);
        }
        return (
            <StyledUploader>
                <div className='imgPreview'>
                    {$imagePreview}
                </div>
                <Button primary onClick={this.handleTrigger}>
                {/* Upload */}
                </Button>
                <input
                    ref={this.triggerRef}
                    name={name}
                    disabled={disabled}
                    placeholder={placeholder}
                    type={type}
                    onChange={(e) => this._handleImageChange(e)}/>
            </StyledUploader>
        )
    }

    triggerRef = ref => {
        this.container = ref;
    };

    handleTrigger = ev => {
        ev.preventDefault();
        this.container.click();
    }
}

export default RenderImage;


// if (avatar && !imagePreviewUrl) {
//     $imagePreview = (<img src={PORT + avatar.url}/>);
// } else if (imagePreviewUrl) {
//     $imagePreview = (<img src={imagePreviewUrl}/>);
// } else {
//     $imagePreview = (<div className='preloader'><img src='../../images/undefUser.png' alt=''/></div>);
// }