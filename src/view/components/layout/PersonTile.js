import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Popup } from "semantic-ui-react";
import { StyledPersonTile } from "../../styleComponents/layout/StyledAssignDropdown";
import {
  IMAGE_PORT,
  BLANK_AVATAR,
  S_REDGUY,
  CUSTOMER
} from "utilities/constants";
import { getUserRole } from "view/utils/functions";
import ClassNames from "classnames";

export default class PersonTile extends Component {
  state = {
    showDropdown: false
  };

  static defaultProps = {
    specialist: {}
  };

  openDropdown = e => {
    e.stopPropagation();

    this.setState(
      {
        showDropdown: true
      },
      () => {
        document.addEventListener("click", this.closeDropdown);
      }
    );
  };

  closeDropdown = e => {
    if (
      this.dropdown &&
      this.dropdown.deleteTile &&
      !this.dropdown.deleteTile.contains(e.target)
    ) {
      this.setState(
        {
          showDropdown: false
        },
        () => {
          document.removeEventListener("click", this.closeDropdown);
        }
      );
    }
  };

  handleCloseButton = e => {
    this.setState(
      {
        showDropdown: false
      },
      () => {
        document.removeEventListener("click", this.closeDropdown);
      }
    );
  };

  removeSpecialist = (event, data) => {
    const { handleRemove, specialist } = this.props;
    handleRemove("remove", specialist.id);
    this.handleCloseButton(event);
  };

  render() {
    const {
      specialist,
      labeled,
      removeTitle,
      userType,
      renderToDashboard,
      hideDelete,
      compressed
    } = this.props;
    const { showDropdown } = this.state;
    const fullName = specialist.first_name + " " + specialist.last_name;

    const avatarClasses = ClassNames({
      "user-avatar": true,
      blank: !specialist.avatar.url
    });

    return (
      <StyledPersonTile compressed={compressed}>
        <a onClick={this.openDropdown}>
          <Popup
            trigger={
              <div className="img-wrapper">
                <img
                  className={avatarClasses}
                  alt={fullName}
                  src={
                    specialist.avatar.url
                      ? IMAGE_PORT + specialist.avatar.url
                      : BLANK_AVATAR
                  }
                />
              </div>
            }
            content={fullName}
            style={
              labeled || showDropdown
                ? { opacity: 0, visibility: "hidden" }
                : {}
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
            ref={el => (this.dropdown = el)}
            specialist={specialist}
            userType={userType}
            removeTitle={removeTitle}
            showDropdown={showDropdown}
            hideDelete={hideDelete}
            removeSpecialist={this.removeSpecialist}
          />
        )}
      </StyledPersonTile>
    );
  }
}

//Delete dropdown for person tile

class DeleteTile extends Component {
  static defaultProps = {
    specialist: {}
  };

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
      removeSpecialist,
      hideDelete
    } = this.props;
    const { user_id, role } = jwtDecode(localStorage.getItem("jwt_token"));
    const thisUser = specialist.id === user_id && role !== CUSTOMER;
    const fullName = specialist.first_name + " " + specialist.last_name;

    return (
      <div
        className={`delete${showDropdown ? " show" : ""}`}
        ref={div => (this.deleteTile = div)}
        onClick={e => e.stopPropagation()}
      >
        <div className="close" onClick={this.closeDropdown} />
        <p className="dropdownTitle">Profile</p>
        <div className="info">
          <img
            src={
              specialist.avatar.url
                ? IMAGE_PORT + specialist.avatar.url
                : BLANK_AVATAR
            }
            alt={fullName}
          />
          <div>
            <NavLink
              className="profileLink"
              target="_blank"
              to={
                thisUser
                  ? "/dashboard/about"
                  : `/dashboard/specialist/${specialist.id}`
              }
            >
              {fullName}
              {thisUser && " (you)"}
            </NavLink>

            {!hideDelete &&
              getUserRole() === S_REDGUY &&
              !thisUser && (
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
