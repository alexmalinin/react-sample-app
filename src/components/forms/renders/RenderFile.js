import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import StyledUploader from "../../../styleComponents/forms/StyledUploader";
import { IMAGE_PORT } from "../../../constans/constans";
import Dropzone from "react-dropzone";

class RenderImage extends Component {
  state = {
    files: []
  };

  fileHub = [];

  _handleFileAttach(e) {
    e.preventDefault();

    let files = e.target.files;
    console.log("files", files);

    this.onDrop(files);
  }

  returnFileName(name) {
    if (name.length > 10) {
      return name.slice(0, 7) + "...";
    } else return name;
  }

  returnFileSize(number) {
    if (number < 1024) {
      return number + "bytes";
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + "KB";
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + "MB";
    }
  }

  onDrop = files => {
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.fileHub = [...this.fileHub, reader.result];
        this.setState({
          files: [...this.state.files, files[i]]
        });
        this.shadowfileInput.value = this.fileHub.join("||");
        this.props.input.onChange(this.shadowfileInput.value);
        // sample for API console.log('end', this.shadowfileInput.value.split('||'));
      };

      reader.readAsDataURL(files[i]);
    }
  };

  render() {
    const {
      input,
      placeholder,
      label,
      name,
      disabled,
      padded,
      dropzone
    } = this.props;

    return (
      <StyledUploader fileLoader dropzone={dropzone} padded={padded}>
        <p>{label}</p>
        <span />
        {dropzone && (
          <Dropzone
            className="dropzone"
            activeClassName="active"
            onDrop={this.onDrop}
            accept=".pdf,.doc,.docx"
          >
            <p>Drop file here or click to select</p>
            <i className="fa fa-cloud-download-alt" />
          </Dropzone>
        )}
        {this.state.files.map((file, key) => (
          <div className="filePreview" key={key}>
            <img src="/images/uploadFile.png" alt="file" />
            <div className="fileInfo">
              <p>{this.returnFileName(file.name)}</p>
              <p>{this.returnFileSize(file.size)}</p>
            </div>
            <div className="detailedInfo">
              <a tabIndex={1} />
              <div className="dropDown">{file.name}</div>
            </div>
          </div>
        ))}
        {!dropzone && (
          <button className="uploadFile" onClick={this.handleTrigger}>
            {/* Upload */}
          </button>
        )}
        <input
          ref={this.triggerRef}
          name={name + "2"}
          disabled={disabled}
          placeholder={placeholder}
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={e => this._handleFileAttach(e)}
        />

        <input
          ref={input => (this.shadowfileInput = input)}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          type="text"
        />
      </StyledUploader>
    );
  }

  triggerRef = ref => {
    this.container = ref;
  };

  handleTrigger = ev => {
    ev.preventDefault();
    this.container.click();
  };
}

export default RenderImage;

// if (avatar && !imagePreviewUrl) {
//     $imagePreview = (<img src={PORT + avatar.url}/>);
// } else if (imagePreviewUrl) {
//     $imagePreview = (<img src={imagePreviewUrl}/>);
// } else {
//     $imagePreview = (<div className='preloader'><img src='../../images/undefUser.png' alt=''/></div>);
// }
