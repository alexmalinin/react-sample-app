import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { Button } from "semantic-ui-react";
import StyledUploader from "../../../styleComponents/forms/StyledUploader";
import { PORT, IMAGE_PORT, BLANK_AVATAR } from "../../../constants/constants";
import { showSortedProjects } from "../../../actions/actions";
import { getUserType } from "../../../helpers/functions";
import { CLIENT, SPECIALIST } from "../../../constants/user";

class RenderImage extends Component {
  state = { file: "", imagePreviewUrl: "" };

  componentWillReceiveProps(nextProps) {
    if (nextProps.logo && nextProps.logo.url) {
      if (this.props.logo.url !== nextProps.logo.url) {
        this.setState({ imagePreviewUrl: IMAGE_PORT + nextProps.logo.url });
      } else {
        this.setState({
          imagePreviewUrl: null
        });
      }
    }
  }

  _handleImageChange(e) {
    const { projectId, showSortedProjects } = this.props;

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      this.props.input.onChange(e);

      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });

        if (projectId) {
          Axios({
            method: "PUT",
            url: `${PORT}/api/v1/projects/${projectId}`,
            data: {
              project: {
                logo: reader.result
              }
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
            }
          })
            .then(res => {
              const userType = getUserType();
              if (userType === CLIENT) showSortedProjects("customers");
              else if (userType === SPECIALIST)
                showSortedProjects("specialists");
            })
            .catch(error => {
              console.error(error);
            });
        }
      };

      reader.readAsDataURL(file);
    }
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
      projectLogo,
      label,
      createProject,
      projectName
    } = this.props;

    let { imagePreviewUrl } = this.state;

    let $imagePreview = null;

    if (avatar && avatar.url && !imagePreviewUrl) {
      $imagePreview = <img src={IMAGE_PORT + avatar.url} alt="" />;
    } else if (logo && logo.url && !imagePreviewUrl) {
      $imagePreview = <img src={IMAGE_PORT + logo.url} alt="" />;
    } else if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="" />;
    } else {
      if (projectLogo) {
        $imagePreview = (
          <div className="projectNoLogo">{projectName && projectName[0]}</div>
        );
      } else {
        $imagePreview = (
          <div className="image-preloader">
            <img src="../../images/icon-avatar.svg" alt="" />
          </div>
        );
      }
    }

    return (
      <StyledUploader
        projectLogo={projectLogo}
        disabled={disabled}
        createProject={createProject}
      >
        {label && <label htmlFor={name}>{label}</label>}

        <div className="upload">
          <div className="upload-image">
            <div className="imgPreview">{$imagePreview}</div>
            <Button primary onClick={this.handleTrigger}>
              {/* Upload */}
            </Button>
          </div>

          {createProject && (
            <div className="upload-label">
              Add your company&rsquo;s logo. The file size must not exceed 5 Mb
            </div>
          )}
        </div>

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

export default connect(null, { showSortedProjects })(RenderImage);
