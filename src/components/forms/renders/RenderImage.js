import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { Button } from "semantic-ui-react";
import StyledUploader from "../../../styleComponents/forms/StyledUploader";
import { PORT, IMAGE_PORT } from "../../../constants/constants";
import {
  showAllProjects,
  showSpecialistProjects
} from "../../../actions/actions";
import { getUserRole } from "../../../helpers/functions";
import { CUSTOMER } from "../../../constants/user";

class RenderImage extends Component {
  state = { file: "", imagePreviewUrl: "" };

  componentWillReceiveProps(nextProps) {
    if (nextProps.logo && nextProps.logo.url) {
      if (this.props.logo.url !== nextProps.logo.url) {
        this.setState({ imagePreviewUrl: IMAGE_PORT + nextProps.logo.url });
      }
    } else {
      this.setState({ imagePreviewUrl: null });
    }
  }

  _handleImageChange(e) {
    const { projectId } = this.props;

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    this.props.input.onChange(e);

    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });

        Axios({
          method: "PUT",
          url: `${PORT}/api/v1/projects/${projectId}`,
          data: {
            project: {
              logo: reader.result
            }
          }
        })
          .then(res => {
            if (getUserRole() === CUSTOMER) {
              this.props.showAllProjects();
            } else {
              this.props.showSpecialistProjects();
            }
          })
          .catch(error => {
            console.log(error);
          });
      };
    }

    file && reader.readAsDataURL(file);
  }

  render() {
    const {
      avatar,
      logo,
      input,
      placeholder,
      name,
      type,
      disabled,
      projectLogo
    } = this.props;

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (avatar && avatar.url && !imagePreviewUrl) {
      $imagePreview = <img src={IMAGE_PORT + avatar.url} />;
    } else if (logo && logo.url && !imagePreviewUrl) {
      $imagePreview = <img src={IMAGE_PORT + logo.url} />;
    } else if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      if (projectLogo) {
        $imagePreview = (
          <div className="image-preloader">
            <img src="../../images/placeholder.png" alt="" />
          </div>
        );
      } else {
        $imagePreview = (
          <div className="image-preloader">
            <img src="../../images/uploadImg.png" alt="" />
          </div>
        );
      }
    }

    return (
      <StyledUploader projectLogo={projectLogo} disabled={disabled}>
        <div className="imgPreview">{$imagePreview}</div>
        <Button primary onClick={this.handleTrigger}>
          {/* Upload */}
        </Button>
        <input
          ref={this.triggerRef}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          accept=".png,.jpg,.jpeg"
          onChange={e => this._handleImageChange(e)}
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

export default connect(null, { showAllProjects, showSpecialistProjects })(
  RenderImage
);

// if (avatar && !imagePreviewUrl) {
//     $imagePreview = (<img src={PORT + avatar.url}/>);
// } else if (imagePreviewUrl) {
//     $imagePreview = (<img src={imagePreviewUrl}/>);
// } else {
//     $imagePreview = (<div className='preloader'><img src='../../images/undefUser.png' alt=''/></div>);
// }
