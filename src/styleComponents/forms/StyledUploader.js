import styled from "styled-components";
import { colors, secondaryColors, boxShadow } from "../constants/colors";

export default styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  &::after,
  &::before,
  span {
    content: "";
    display: inline-block;
    width: 100px;
    order: 1;
  }

  ${props => (props.fileLoader ? `margin-top: 24px` : ``)};
  ${props => (props.padded ? `padding: 0 20px` : ``)};

  input {
    display: none;
  }

  .imgPreview {
    display: inline-block;
    margin-left: 30px;

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
    height: 100px;
    display: flex;
    flex-flow: row wrap;
    position: relative;
    border: 2px dashed #ccc;
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
    left: 30px;
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
    text-transform: uppercase;
    color: #666;
    font-weight: bold;
    word-spacing: 1.5px;
    padding-left: 7px;
    margin-bottom: 24px;
  }

  .filePreview {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100px;
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #f2f2f2;
    position: relative;

    img {
      height: 26px;
    }

    .fileInfo {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      margin-left: 3px;

      p {
        padding: 0;
        margin: 0;
        font-size: 10px;
        color: #ccc;
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
  }

  .uploadFile {
    position: relative;
    height: 40px;
    width: 100px;
    background: none;
    margin-bottom: 10px;
    border: 1px solid #f2f2f2;
    cursor: pointer;
    outline: none;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: calc(50% - 8px);
      left: calc(50% - 1px);
      height: 16px;
      width: 2px;
      background-color: #f2f2f2;
    }

    &::after {
      transform: rotate(90deg);
    }
  }

  @media (max-width: 499px) {
    flex-direction: column;

    .imgPreview {
      margin: 0 0 30px 0;
    }
  }
`;
