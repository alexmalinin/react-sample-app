import styled from "styled-components";
import { boxShadow, colors, primaryColors } from "../constants/colors";
import { Popup } from "semantic-ui-react";

export const StyledAssignDropdown = styled.div`
  position: relative;
  margin: 5px 7px 5px 0;
  outline: none;

  color: #ddd;
  cursor: default;

  .dropdownTitle {
    color: #5366e5;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.3px;
  }

  .close {
    position: absolute;
    top: 3px;
    right: 3px;
    height: 10px;
    width: 10px;
    padding: 10px;
    cursor: pointer;
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 1px;
      background: #666;
      transform: translate(-50%, -50%) rotate(var(--crossRotate, 45deg));
    }
    &::after {
      --crossRotate: -45deg;
    }
  }

  .dropdownTrigger {
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    outline: none;
    color: white;
    transition: 0.2s;
    cursor: pointer;

    ${props =>
      props.renderToModal &&
      `
      margin: 0px;
      display: flex;
      align-items: center;
    `};

    &:hover {
      color: #999;

      .plus {
        color: #ddd;
      }

      .label {
        color: #666;
      }
    }

    span {
      transition: inherit;
    }

    .plus {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: ${props => (props.renderToModal ? "0" : "4px 0")};
      height: ${props => (props.renderToModal ? "48px" : "36px")};
      width: ${props => (props.renderToModal ? "48px" : "36px")};
      color: ${props => (props.blue ? colors.darkBlue : "#ccc")};
      border-radius: 50%;
      border: ${props => (props.blue ? "none" : "1px solid #ccc")};
      background: ${props => (props.blue ? "#eaeffa" : "white")};

      text-align: center;
      font-size: ${props => (props.renderToModal ? "36px" : "21px")};
      line-height: ${props => (props.renderToModal ? "42px" : "unset")};
      margin-right: ${props => (props.renderToModal ? "8px" : "5px")};
      font-weight: 300;

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: ${props => (props.renderToModal ? "20px" : "12px")};
        width: 2px;
        border-radius: 2px;
        background: ${props => (props.blue ? colors.darkBlue : "#ccc")};
      }

      &::after {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }

    .label {
      font-size: ${props => (props.renderToModal ? "1.2em" : "16px")};
      color: #999;
      font-weight: 400;

      &.assignTeam {
        font-size: 14px;
        color: ${primaryColors.lightGrey};

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .preloader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;

    i {
      font-size: 2em;
    }
  }

  .dropdown {
    position: absolute;
    z-index: 1001;

    top: calc(100% + 5px);
    left: 10px;
    min-width: 240px;

    border-radius: 3px;
    background: #fff;
    ${boxShadow.dark};

    .dropdownTitle {
      padding: 10px 15px 0 15px;
      margin-bottom: 0;
    }

    .ui.input {
      width: 100%;
      padding: 10px 15px;

      input {
        display: inline-block;
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 1;
        font-size: 12px;

        &::placeholder {
          color: #a1a1a1;
        }

        &:focus {
          border-color: #dbdbdb;
        }
      }

      i.spinner {
        z-index: 1;
        right: 15px;
      }
    }

    .dropdown-list {
      z-index: 2;
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      max-height: 240px;
      overflow-y: auto;
      border-radius: inherit;
      background: #fff;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      div {
        position: relative;
        display: flex;
        flex: 0 0 auto;
        order: 1;
        align-items: center;
        padding: 5px 15px;
        top: calc(100% + 5px);
        overflow-y: hidden;

        font-family: "Roboto";
        font-size: 16px;
        font-weight: 500;
        color: #666;
        cursor: pointer;

        &:hover {
          background: #f7f7f7;
        }

        text-transform: none;

        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
        }

        &.assigned {
          order: 0;

          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 25px;
            width: 6px;
            height: 2px;
            background: #38ffbf;
            transform: rotate(45deg);
            transform-origin: 100% 50%;
            border-radius: 2px;
          }
          &::before {
            width: 13px;
            transform: rotate(133deg);
          }

          .dropdownTitle {
            padding: 10px 15px 0 15px;
            margin-bottom: 0;
          }

          .ui.input {
            width: 100%;
            padding: 10px 15px;

            input {
              display: inline-block;
              position: relative;
              height: 100%;
              width: 100%;
              z-index: 1;
              font-size: 12px;

              &::placeholder {
                color: #a1a1a1;
              }

              &:focus {
                border-color: #dbdbdb;
              }
            }
          }
        }
      }

      .noResults {
        padding: 5px 15px;
        color: ${primaryColors.accentGrey};
      }
    }
  }
`;

export const StyledDropdown = styled(Popup)`
  .ui.attached.tabular.menu {
    min-width: 240px;
  }

  .dropdownTitle {
    color: ${colors.darkBlue};
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
  }

  .ui.attached.bottom {
    padding: 0;
    .ui.input {
      font-size: 12px;
      margin: 8px 16px 0;
    }

    .dropdown-list {
      margin-top: 4px;
      padding-bottom: 8px;
      max-height: 160px;
      overflow-y: auto;

      & > div {
        display: flex;
        align-items: center;
        color: ${primaryColors.darkGrey};
        padding: 8px 16px;
        cursor: pointer;

        img {
          height: 36px;
          width: 36px;
          background: white;
          border-radius: 50%;
          margin-right: 6px;
        }

        &:hover {
          background: ${primaryColors.backgroundColor};
        }
      }
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }
  }
`;

export const StyledPersonTile = styled.div`
  color: #999;
  font-size: 500;
  padding: 4px 0;
  position: relative;
  cursor: pointer;
  text-transform: none;
  font-weight: 400;
  margin-right: ${props => (props.compressed ? "-8px" : "0")};

  .imgWrapper {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: ${props => (props.compressed ? "0 " : "5px")};

    img {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 50%;
      object-fit: cover;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: ${colors.darkBlue};
      opacity: 0;
    }
  }

  a {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    text-decoration: none;
    color: inherit;
    outline: none;

    &:focus {
      .imgWrapper {
        &::before {
          opacity: 0.15;
        }
      }
    }

    &:hover {
      color: inherit;
    }
  }

  .delete {
    position: absolute;
    z-index: 1;

    display: flex;
    opacity: 0;
    visibility: hidden;
    flex-flow: column nowrap;

    top: calc(100% + 4px);
    left: 0;
    min-width: 220px;
    padding: 10px 15px 15px 15px;

    background: #fff;
    border-radius: 5px;
    font-family: "Roboto";
    white-space: nowrap;
    text-align: left;
    ${boxShadow.dark};
    cursor: default;

    &.show {
      opacity: 1;
      visibility: visible;
    }

    .profileLink {
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 16px;
      color: ${primaryColors.darkGrey};
      &:hover {
        text-decoration: underline;
      }
    }

    .dropdownTitle {
      font-size: 10px;
      text-transform: uppercase;
    }

    .info {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        background: #fff;
        border-radius: 50%;
      }

      div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        padding: 0 8px;

        p {
          color: #666;
          font-weight: 500;
          font-size: 16px;
          text-transform: none;
        }

        button {
          padding: 7px 7px 3px 7px;

          p {
            margin-bottom: 5px;
          }

          color: #fff;
          font-size: 12px;
          font-weight: 500;
          border: none;
          border-radius: 2px;
          background: ${primaryColors.red};
          cursor: pointer;
        }
      }
    }
  }
`;

export const StyledSpecialist = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 3px 0;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    .avatar {
      button {
        opacity: 0.7;
      }
    }
  }

  .avatar {
    position: relative;
    height: 48px;
    width: 48px;
    flex: 0 0 48px;
    border-radius: 50%;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      background: #fff;
    }

    button {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 100%;
      width: 100%;
      border: none;
      transform: translate(-50%, -50%);
      background: ${primaryColors.red};
      cursor: pointer;
      opacity: 0;
      transition: 0.3s;

      &::before,
      &::after {
        content: "";
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(var(--crossRotate, 0));
        position: absolute;
        height: 24px;
        width: 2px;
        background: white;
      }

      &::before {
        --crossRotate: 45deg;
      }

      &::after {
        --crossRotate: -45deg;
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  p {
    flex: 1 1 auto;
    margin-left: 10px;
    margin-bottom: 0;
    font-size: 1.1em;
    color: #666;
  }

  .ui.input {
    flex: 0 0 80px;
    margin-right: 8px;

    input {
      padding: 0.67em;
    }
  }
`;

export const StyledMembersWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .dropdownWrapper {
    display: inline-flex;
    position: relative;
    padding: 4px 0;

    .allMembers {
      margin-right: 5px;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      background: #eaeffa;
      color: ${colors.darkBlue};
      text-align: center;
      line-height: 36px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      z-index: 1;
    }

    .membersDropdown {
      position: absolute;
      z-index: 100;
      top: calc(100% + 4px);
      left: 0;
      width: 240px;
      padding: 1rem;
      background: white;
      ${boxShadow.dark};
      border-radius: 3px;

      & > div {
        display: inline-block;
      }

      h3 {
        flex: 0 0 100%;
        font-size: 0.8em;
        text-transform: uppercase;
        color: ${colors.darkBlue};
        padding-bottom: 5px;
        margin-bottom: 4px;
        font-weight: 600;
        font-family: "Roboto";
        border-width: 0px;
        border-bottom-width: 3px;
        border-style: solid;
        -webkit-border-image: -webkit-gradient(left, #2d68ee 0%, #7439e3 100%)
          100% 2 stretch;
        -webkit-border-image: -webkit-linear-gradient(
            left,
            #2d68ee 0%,
            #7439e3 100%
          )
          100% 2 stretch;
        -moz-border-image: -moz-linear-gradient(left, #2d68ee 0%, #7439e3 100%)
          100% 2 stretch;
        -o-border-image: -o-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100%
          2 stretch;
        border-image: linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2
          stretch;
      }
    }
  }
`;
