import styled from "styled-components";
import { boxShadow, colors, primaryColors } from "../constants/colors";

export const StyledAssignDropdown = styled.div`
  position: relative;
  margin: 5px 7px 5px 0;
  outline: none;

  color: #ddd;
  cursor: pointer;

  .dropdownTitle {
    color: #5366e5;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.3px;
  }

  .close {
    position: absolute;
    top: 5px;
    right: 10px;
    height: 10px;
    width: 10px;
    cursor: pointer;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 1px;
      background: #bbb;
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }

  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    color: inherit;
    outline: none;
    color: #ddd;
    transition: 0.2s;

    ${props =>
      props.renderToModal &&
      `
      margin: 10px;
      display: flex;
      align-items: center;
    `}

    &:hover {
      color: #999;

      .plus {
        color: #ddd;
      }

      .label{
        color: #666;
      }
    }

    span{
      transition: inherit;
    }

    .plus {
      display: inline-block;
      height: ${props => (props.renderToModal ? "48px" : "30px")};
      width: ${props => (props.renderToModal ? "48px" : "30px")};
      border: 1px solid #ddd;
      border-radius: 50%;

      text-align: center;
      font-size: ${props => (props.renderToModal ? "36px" : "24px")};
      line-height: ${props => (props.renderToModal ? "42px" : "24px")};
      letter-spacing: -1px;
      margin-right: ${props => (props.renderToModal ? "8px" : "5px")};
      font-weight: 300;
    }

    .label{
      font-size: ${props => (props.renderToModal ? "1.2em" : "18px")};
      color: #999;
    }
  }

  .preloader{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;

    i{
      font-size: 2em;
    }
  }

  .dropdown {
    position: absolute;
    z-index: 1001;
    display: none;

    top: calc(100% + 5px);
    left: 10px;
    min-width: 240px;

    border-radius: 3px;
    background: #fff;
    ${boxShadow.dark};

    &.visible {
      display: block;
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

    .dropdown-list {
      z-index: 2;
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      max-height: 240px;
      overflow-y: auto;
      border-radius: inherit;
      background: #fff;

      &::-webkit-scrollbar{
        width: 4px;
      }

      &::-webkit-scrollbar-track{
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

        font-family: "Brix";
        font-size: 16px;
        font-weight: 500;
        color: #666;
        cursor: pointer;

        &:hover {
          background: #f7f7f7;
        }

        text-transform: none;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
        }

        &.assigned {
          order: 0;
          ${props => props.renderToModal && "display: none;"}

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
        .dropdownTitle{
            padding: 10px 15px 0 15px;
            margin-bottom: 0;
        }

        .ui.input{
            width: 100%;
            padding: 10px 15px;

            input{
                display: inline-block;
                position: relative;
                height: 100%;
                width: 100%;
                z-index: 1;
                font-size: 12px;

                &::placeholder{
                    color: #a1a1a1;
                }

                &:focus{
                    border-color: #dbdbdb;
                }
            }
        }
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

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }

  a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    text-decoration: none;
    color: inherit;
    outline: none;

    &:focus {
      opacity: 0.7;
    }

    &:hover {
      color: inherit;
    }
  }

  .delete {
    position: absolute;
    z-index: 1;

    /* display: none; */
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
    font-family: "Brix";
    white-space: nowrap;
    text-align: left;
    ${boxShadow.dark};
    cursor: default;

    &.show {
      /* display: flex; */
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
          background: #e8433e;
          cursor: pointer;
        }
      }
    }
  }
`;

export const StyledSpecialist = styled.div`
  .ui.grid {
    .row {
      margin: 10px 0;
      border-radius: 5px;
      transition: 0.3s;
      padding: 3px 0;

      &:hover {
        background: #f0f0f0;
        button {
          &::before,
          &::after {
            opacity: 1;
          }
        }
      }

      .column {
        display: flex;
        align-items: center;
        padding-left: 0;
        img {
          margin-left: 10px;
          height: 48px;
          width: 48px;
          object-fit: contain;
          background: #fff;
          border-radius: 50%;
        }
        p {
          margin-left: 10px;
          margin-bottom: 0;
          font-size: 1.2em;
          color: #666;
        }
      }

      button {
        position: absolute;
        right: 0;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border: none;
        background: none;
        height: 100%;
        width: 50px;
        top: 50%;
        transform: translateY(-50%);
        transition: inherit;
        cursor: pointer;
        outline: none;

        &:hover {
          background: #ccc;
        }

        &::before,
        &::after {
          content: "";
          position: absolute;
          top: calc(50% - 15px);
          left: calc(50% - 1px);
          height: 30px;
          width: 2px;
          background: #fff;
        }

        &::before {
          transform: rotate(45deg);
        }

        &::after {
          transform: rotate(-45deg);
        }
      }
    }
  }
`;
