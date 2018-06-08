import React, { Component } from "react";
import { initialize, change } from "redux-form";
import axios from "axios";
import StyledUploader from "../../../styleComponents/forms/StyledUploader";
import { PORT } from "../../../constans/constans";

import Dropzone from "react-dropzone";
import { Loader } from "semantic-ui-react";

class RenderFile extends Component {
  state = {
    files: [],
    error: false,
    loading: false
  };

  fileHub = [];

  componentWillMount() {
    if (this.props.input.value) {
      this.setState({
        files: this.props.input.value
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value) {
      this.setState({
        files: nextProps.input.value
      });
    }

    if (!nextProps.onSelfSubmit) {
      if (nextProps.submitSucceeded) {
        this.state.files.forEach(file => {
          if (file.id && file.status && file.status === "delete") {
            this.deleteAttachedFile(file.id);
          }
        });
      }
    }
  }

  validateFileExtension = fld => {
    if (
      !/(\.txt|\.rtf|\.doc|\.docx|\.html|\.pdf|\.odt|\.psd|\.jpg|\.zip|\.png)$/i.test(
        fld
      )
    ) {
      this.setState({ error: true });
      return false;
    }

    this.setState({ error: false });
    return true;
  };

  _handleFileAttach(e) {
    e.preventDefault();

    let files = e.target.files;

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
    console.log("files", files);
    if (files.length < 1) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }

    for (let file of files) {
      const {
        onSelfSubmit,
        entity_type,
        input,
        meta: { dispatch, form }
      } = this.props;
      if (!this.validateFileExtension(file.name)) {
        return false;
      }

      let reader = new FileReader();
      this.setState({ loading: true });

      reader.onloadend = () => {
        if (onSelfSubmit) {
          onSelfSubmit(input.name + "_attributes", [
            {
              document: reader.result,
              entity_type
            }
          ])
            .then(resp => {
              const { data } = resp;
              dispatch(change(form, input.name, data[input.name]));
              this.setState({ loading: false });
            })
            .catch(error => console.log(error));
        } else {
          this.fileHub = [...this.fileHub, reader.result];
          this.setState({
            files: [...this.state.files, file],
            loading: false
          });
          dispatch(change(form, "file", this.fileHub));
        }

        // sample for API console.log('end', this.shadowFileInput.value.split('||'));
      };

      reader.readAsDataURL(file);
    }
  };

  changeFileStatus = (id, name, status) => {
    let data = this.state.files.slice(),
      index;

    if (id) {
      index = data.findIndex(file => file.id === id);
      data[index].status = status;
    }

    if (name) {
      index = data.findIndex(file => file.name === name);
      data[index].status = status;
    }

    if (this.props.onSelfSubmit) {
      this.deleteAttachedFile(id);
    }

    this.setState({
      files: data
    });
  };

  getFileExtension = file => {
    let filetype = file.split(".").pop();

    switch (filetype) {
      case "doc":
      case "docx":
        return "-word";
      case "html":
        return "-code";
      case "zip":
        return "-archive";
      case "jpg":
      case "jpeg":
      case "png":
        return "-image";
      case "pdf":
        return "-pdf";
      default:
        return "-alt";
    }
  };

  deleteAttachedFile = file => {
    this.setState({ loading: true });
    return axios
      .delete(`${PORT}/api/v1/attached_files/${file}`)
      .then(resp => this.setState({ loading: false }))
      .catch(error => console.log(error));
  };

  downloadFile = file => {
    let fileName = file.document.url.split("/").pop();

    return axios({
      url: `${PORT}/api/v1/attached_files/${file.id}/download`,
      method: "POST",
      responseType: "blob"
    })
      .then(res => {
        this.getFile(fileName, res);
      })
      .catch(error => console.log(error));
  };

  getFile = (fileName, res) => {
    // let blob = new Blob([res], { type: res.data.type });
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(res.data);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    const {
      input,
      placeholder,
      label,
      name,
      disabled,
      padded,
      dropzone,
      className,
      onSelfSubmit,
      ...rest
    } = this.props;
    console.log(this.state.loading);

    return (
      <StyledUploader
        fileLoader
        dropzone={dropzone}
        padded={padded}
        className={className}
        {...rest}
      >
        <p>{label}</p>
        <span />

        {dropzone &&
          !disabled && (
            <Dropzone
              className="dropzone"
              activeClassName="active"
              onDrop={this.onDrop}
              accept=".txt, .rtf, .doc, .docx, .html, .pdf, .odt, .psd, .jpg, .zip, .png"
            >
              <p>Drop file here or click to select</p>
              {!rest.small && <i className="fa fa-cloud-download-alt" />}
            </Dropzone>
          )}

        {this.state.files.map((file, key) => (
          <div
            key={key}
            className={`filePreview ${
              file.status && file.status === "delete" ? "disabled" : "active"
            } ${onSelfSubmit ? " selfSubmit" : ""}`}
            onClick={
              file.status && file.status === "delete"
                ? () => this.changeFileStatus(file.id, file.name, "save")
                : null
            }
          >
            <div className="fileIcon" onClick={() => this.downloadFile(file)}>
              <i
                className={`far fa-file${
                  file.name
                    ? this.getFileExtension(file.name)
                    : this.getFileExtension(file.document.url)
                }`}
              />
            </div>
            <div className="fileInfo">
              <p className="fileName">
                {file.name
                  ? this.returnFileName(file.name)
                  : this.returnFileName(file.document.url.split("/").pop())}
              </p>
              <p className="fileSize">
                {file.size
                  ? this.returnFileSize(file.size)
                  : this.returnFileSize(0)}
              </p>
            </div>

            {file.status !== "delete" && (
              <div
                className="file-delete"
                onClick={() =>
                  this.changeFileStatus(file.id, file.name, "delete")
                }
              >
                <i className="fas fa-times" />
              </div>
            )}
          </div>
        ))}
        <Loader inline inverted disabled={!this.state.loading} />

        {!dropzone &&
          !disabled && (
            <button className="uploadFile" onClick={this.handleTrigger}>
              {/* Upload */}
            </button>
          )}
        <input
          ref={this.triggerRef}
          name={input.name + "2"}
          disabled={disabled}
          placeholder={placeholder}
          type="file"
          multiple
          accept=".txt, .rtf, .doc, .docx, .html, .pdf, .odt, .psd, .jpg, .zip, .png"
          onChange={e => this._handleFileAttach(e)}
        />

        <input
          ref={input => (this.shadowFileInput = input)}
          name={input.name}
          disabled={disabled}
          placeholder={placeholder}
          type="text"
        />

        {this.state.error ? (
          <div className="errorMessage">
            <span>
              Invalid file type. <br />Allowed file extensions: .txt, .rtf,
              .doc, .docx, .html, .pdf, .odt, .psd, .jpg, .zip, .png
            </span>
          </div>
        ) : null}
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

export default RenderFile;

// if (avatar && !imagePreviewUrl) {
//     $imagePreview = (<img src={PORT + avatar.url}/>);
// } else if (imagePreviewUrl) {
//     $imagePreview = (<img src={imagePreviewUrl}/>);
// } else {
//     $imagePreview = (<div className='preloader'><img src='../../images/undefUser.png' alt=''/></div>);
// }
