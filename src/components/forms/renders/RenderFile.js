import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import StyledUploader from '../../../styleComponents/forms/StyledUploader';
import { PORT } from "../../../constans/constans";

class RenderImage extends Component {

    state = {
        files: [] 
    };

    _handleFileAttach(e) {
        e.preventDefault();

        let reader = new FileReader();
        let files = e.target.files;

        this.props.input.onChange(e);

        // reader.onloadend = () => {
        //     this.setState({
        //         files: [...this.state.files, files[0]]
        //     });
        // };

        // reader.readAsDataURL(files);

        this.setState({
            files: [...this.state.files, files[0]]
        });
    }

    returnFileName(name) {
        if(name.length > 10){
            return name.slice(0, 5) + '...';
        } else return name;
    }

    returnFileSize(number) {
        if(number < 1024) {
            return number + 'bytes';
        } else if(number > 1024 && number < 1048576) {
            return (number/1024).toFixed(1) + 'KB';
        } else if(number > 1048576) {
            return (number/1048576).toFixed(1) + 'MB';
        }
    }

    render() {
        console.log(this.state.files);

        const {
            input,
            placeholder,
            label,
            name,
            type,
            disabled,
            padded,
        } = this.props;

        return (
            <StyledUploader fileLoader padded={padded}>
                <p>{label}</p>
                {this.state.files.map((file, key) => 
                    <div className='filePreview' key={key}>
                        <img src="/images/uploadFile.png" alt="file"/>
                        <div className="fileInfo">
                            <p>{this.returnFileName(file.name)}</p>
                            <p>{this.returnFileSize(file.size)}</p>
                        </div>
                        <div className="detailedInfo">
                            <a tabIndex={1}></a>
                            <div className="dropDown">
                                {file.name}
                            </div>
                        </div>
                    </div>
                )}
                <button className='uploadFile' onClick={this.handleTrigger}>
                {/* Upload */}
                </button>
                <input
                    ref={this.triggerRef}
                    name={name}
                    disabled={disabled}
                    placeholder={placeholder}
                    type={type}
                    onChange={(e) => this._handleFileAttach(e)}/>
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