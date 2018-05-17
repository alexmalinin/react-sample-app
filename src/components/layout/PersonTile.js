import React, { Component } from "react";
import { StyledPersonTile } from "../../styleComponents/layout/StyledAssignDropdown";
import { IMAGE_PORT, S_REDGUY } from "../../constans/constans";
import { getUserType } from "../../helpers/functions";

export default class PersonTile extends Component {
  state = {
    showDropdown: false
  };

  openDropdown = e => {
    this.setState({
      showDropdown: true
    });
  };

  closeDropdown = () => {
    setTimeout(() => {
      this.setState({
        showDropdown: false
      });
    }, 100);
  };

  removeSpecialist = (event, data) => {
    const { handleRemove, specialist } = this.props;
    handleRemove("remove", specialist.id);
    this.closeDropdown();
  };

  render() {
    const {
      specialist,
      labeled,
      removeTitle,
      userType,
      renderToDashboard
    } = this.props;
    const { showDropdown } = this.state;

    return (
      <StyledPersonTile>
        <a tabIndex="1" onClick={this.openDropdown} onBlur={this.closeDropdown}>
          <img
            onClick={e => e.target.parentNode.focus()}
            alt="avatar"
            src={
              specialist.avatar.url
                ? IMAGE_PORT + specialist.avatar.url
                : "/images/uploadImg.png"
            }
          />
          {labeled &&
            renderToDashboard && (
              <p>
                {specialist.first_name} {specialist.last_name}
              </p>
            )}
        </a>
        {showDropdown && (
          <DeleteTile
            specialist={specialist}
            userType={userType}
            removeTitle={removeTitle}
            showDropdown={showDropdown}
            removeSpecialist={this.removeSpecialist}
          />
        )}
      </StyledPersonTile>
    );
  }
}

//Delete dropdown for person tile

class DeleteTile extends Component {
  componentDidMount() {
    let deleteRect = this.deleteTile.getBoundingClientRect();

    if (deleteRect.width + deleteRect.left + 10 > document.body.clientWidth) {
      this.deleteTile.style.left =
        -deleteRect.width -
        deleteRect.left +
        document.body.clientWidth -
        15 +
        "px";
    }

    if (deleteRect.height + deleteRect.y > document.body.clientHeight) {
      this.deleteTile.style.top = "auto";
      this.deleteTile.style.bottom = "calc(100% + 4px)";
    }
  }

  render() {
    const {
      specialist,
      removeTitle,
      showDropdown,
      removeSpecialist
    } = this.props;
    return (
      <div
        className={`delete${showDropdown ? " show" : ""}`}
        ref={div => (this.deleteTile = div)}
      >
        <div className="close" onClick={this.closeDropdown} />
        <p className="dropdownTitle">Profile</p>
        <div className="info">
          <img
            src={
              specialist.avatar.url
                ? IMAGE_PORT + specialist.avatar.url
                : "/images/uploadImg.png"
            }
            alt="avatar"
          />
          <div>
            <p>{specialist.first_name + " " + specialist.last_name}</p>
            {getUserType() === S_REDGUY && (
              <button
                data={specialist.id}
                onClick={removeSpecialist}
                className="remove"
                type="button"
              >
                Remove from {removeTitle}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
