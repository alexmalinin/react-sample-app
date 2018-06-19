import styled from "styled-components";
import {
  colors,
  secondaryColors,
  boxShadow,
  primaryColors
} from "../constants/colors";

export default styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 20px;

  &.projectFiles {
    .ui.loader {
      margin-right: 30px;
    }
  }

  &::after,
  &::before,
  span {
    content: "";
    display: inline-block;
    width: 100px;
    order: 1;
  }

  ${props => (props.indentTop ? `margin-top: 24px` : ``)};
  ${props => (props.padded ? `padding: 0 20px` : ``)};

  & > p {
    text-transform: uppercase;
  }

  input {
    display: none;
  }

  .imgPreview {
    display: inline-block;
    margin-left: ${props => (props.projectLogo ? "0" : "30px")};

    & img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: ${props => (props.projectLogo ? "contain" : "cover")};
    }
  }

  .preloader {
    padding: 0;

    img {
      width: 120px;
    }
  }

  .dropzone {
    width: 100%;
    height: ${props => (props.small ? "60px" : "100px")};
    display: flex;
    flex-flow: row wrap;
    position: relative;
    border-color: #ccc;
    border-style: dashed;
    border-width: ${props => (props.small ? "2px" : "2px")};
    border-radius: ${props => (props.small ? "0px" : "0")};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s, border-color 0.3s;
    margin-bottom: 14px;

    p {
      text-align: center;
      font-size: 1.2em;
      font-weight: 500;
      margin-bottom: 0;
      color: #ccc;
      transition: inherit;
    }

    i {
      font-size: 2em;
      color: #ccc;
      transition: inherit;
    }

    &.active {
      border-style: solid;
      border-color: ${colors.blue};
      &::after {
        content: "Drop here";
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        text-transform: uppercase;
        font-family: "Brix";
        font-size: 1.6em;
        color: #666;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        /* background: repeating-linear-gradient(-45deg, #ccc 0px, #ccc 20px, #ddd 20px, #ddd 40px); */
        background: #fff;
      }
    }

    &:hover {
      border-color: #666;
      p,
      i {
        color: #666;
      }
    }
  }

  .ui.button {
    ${props =>
      props.disabled ? "display: none;" : ""} padding: 60px !important;
    border-radius: 50%;
    position: relative;
    background-color: transparent !important;
    position: absolute;
    top: 0px;
    ${props => (props.projectLogo ? null : "left: 30px;")};
  }
  .ui.button::after,
  .ui.button::before {
    content: "";
    width: 35px;
    height: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #00ffc0;
    position: absolute;
    opacity: 0;
  }
  .ui.button::after {
    height: 35px;
    width: 5px;
  }

  .ui.button:hover.ui.button::after,
  .ui.button:hover.ui.button::before {
    opacity: 1;
  }

  p {
    flex: 0 0 100%;
    font-size: 12px;
    color: #666;
    font-weight: bold;
    word-spacing: 1.5px;
    padding-left: ${props => (props.small ? "0" : "7px")};
    margin-bottom: 24px;
  }

  .filePreview {
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 10px;
    padding: 5px;
    padding-right: 15px;
    position: relative;
    cursor: pointer;

    .fileIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 36px;
      width: 36px;
      background: rgba(72, 97, 242, 0.1);
      border-radius: 3px;

      i {
        font-size: 22px;
        color: ${colors.darkBlue};
      }
    }

    &.active {
      .fileIcon:hover i:before {
        content: "\f358";
      }
    }

    .fileInfo {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      margin-left: 3px;

      p {
        padding: 0;
        margin: 0;
        font-size: 13px;
        line-height: 16px;
        color: ${primaryColors.accentGrey};
        font-weight: 500;

        &.fileName {
          color: ${primaryColors.darkGrey};
        }
        &.fileSize {
        }
      }
    }

    .detailedInfo {
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      z-index: 100;

      a {
        display: inline-block;
        height: 10px;
        width: 10px;
        margin-left: 5px;
        outline: none;

        &::before {
          content: "";
          display: inline-block;
          position: absolute;
          height: 6px;
          width: 6px;
          top: 40%;
          left: 50%;
          border-color: #ccc;
          border-style: solid;
          border-width: 0;
          border-bottom-width: 2px;
          border-left-width: 2px;
          transform: rotate(-45deg);
        }

        &:focus ~ .dropDown {
          display: inline-block;
        }
      }

      .dropDown {
        position: absolute;
        display: none;
        right: 0;
        top: calc(100% + 10px);

        min-width: 100px;
        min-height: 50px;
        padding: 8px;
        white-space: nowrap;

        background-color: #fff;
        ${boxShadow.dark};
      }
    }

    &.disabled {
      opacity: 0.5;

      &.selfSubmit {
        display: none;
      }
    }

    &:hover .file-delete {
      display: block;
    }

    & .file-delete {
      position: absolute;
      font-size: 10px;
      color: #666;
      right: 5px;
      top: 0;
      display: none;
    }
  }

  .ui.loader:after {
    border-color: #666 transparent transparent transparent !important;
  }

  .uploadFile {
    position: relative;
    height: 36px;
    width: 36px;
    background: rgba(152, 158, 169, 0.1);
    margin-bottom: 10px;
    margin-left: 5px;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    outline: none;
    transition: 0.3s;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: calc(50% - 8px);
      left: calc(50% - 1px);
      height: 16px;
      width: 2px;
      background-color: ${primaryColors.lightGrey};
      transition: inherit;
    }

    &::after {
      transform: rotate(90deg);
    }

    &:hover {
      background: rgba(152, 158, 169, 0.3);

      &::before,
      &::after {
        background-color: ${primaryColors.accentBackground};
      }
    }
  }

  .errorMessage {
    color: #db4538;
    width: 100%;
    padding: 5px;

    span {
      width: 100%;
    }
  }

  @media (max-width: 499px) {
    flex-direction: column;

    .imgPreview {
      margin: 0 0 30px 0;
    }
  }
`;
