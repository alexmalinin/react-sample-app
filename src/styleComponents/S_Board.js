import styled from "styled-components";
import { primaryColors, boxShadow } from "./constants/colors";

export const S_Board = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  user-select: none;
  transition: 0.4s ease-in-out;

  div.hidden.transition {
    display: none;
  }

  h3 {
    text-transform: uppercase;
    font-size: 14px;
    padding-bottom: 15px;
    /* flex: 0 0 31.5%; */

    border-width: 0px;
    border-bottom-width: 3px;
    border-style: solid;
    -webkit-border-image: -webkit-gradient(left, #2d68ee 0%, #7439e3 100%) 100%
      2 stretch;
    -webkit-border-image: -webkit-linear-gradient(
        left,
        #2d68ee 0%,
        #7439e3 100%
      )
      100% 2 stretch;
    -moz-border-image: -moz-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100%
      2 stretch;
    -o-border-image: -o-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2
      stretch;
    border-image: linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
  }

  .dragContainer {
    flex: 0 0 31.5%;
    margin-bottom: 20px;

    .addModule {
      min-height: auto;
    }
  }

  .kanban {
    width: 100%;

    display: flex;
    justify-content: space-between;
    background: none;
    height: auto;
    overflow-y: visible;

    &.visible {
      display: flex !important;
    }

    & > section {
      flex: 0 0 31.5%;
      background: none;
      max-height: 100%;
      height: 100%;
      overflow: visible;
      margin: 0;
      padding: 0;
      padding-bottom: 120px;

      & > header {
        text-transform: uppercase;
        font-size: 14px;
        padding-bottom: 15px;
        margin-bottom: 20px;
        z-index: 900;

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

      & > div {
        width: 100%;
        overflow: visible;
        z-index: 901;

        article {
          max-width: 100%;
          width: 100%;
          padding-top: 30px;
          border: none;
        }
      }
    }
  }

  .noTasks,
  .noModules {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 80px;
    padding-bottom: 160px;
    text-align: center;
    text-transform: uppercase;
    font-size: 28px;
  }

  .moduleWrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 100%;

    &::after {
      content: "";
      height: 0;
      flex: 0 0 31.5%;
    }
  }

  .dragItem {
    position: relative;
    padding: 20px 20px 15px 20px;
    ${boxShadow.light};
    border-radius: 2px;

    text-transform: uppercase;

    &::before {
      content: "...";
      position: absolute;
      top: 5px;
      right: 20px;
      font-size: 20px;
      color: #7f7f7f;
      user-select: none;
      cursor: pointer;
    }

    h4 {
      margin-top: 0;
      margin-bottom: 10px;

      font-size: 13px;
      letter-spacing: 1.04px;
    }

    .platform {
      font-size: 13px;

      &.purple {
        color: #8a2be0;
      }
      &.blue {
        color: #4469e1;
      }
      &.lightblue {
        color: #00abdf;
      }
      &.cyan {
        color: #1db6bd;
      }
    }

    .persons {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      max-width: 80%;
      font-family: "Brix";
    }

    .bell-line {
      display: flex;
      align-items: center;
      height: 40px;

      .bell {
        margin-left: 5px;
        margin-right: 5px;
        height: 20px;
        width: 20px;
        background: url("/images/bell.png") no-repeat center center;
        background-size: 14px auto;
      }

      .dot {
        height: 5px;
        width: 5px;
        border: 2px solid #ababab;
        border-radius: 50%;
        margin-left: 2px;
      }
    }

    .ddtw {
      position: absolute;
      bottom: 10px;
      right: 20px;

      font-weight: 600;
      font-size: 12px;
      color: #989898;
    }
  }

  .module {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    position: relative;
    min-height: 250px;
    margin-top: 30px;
    padding: 30px;
    ${boxShadow.light};
    background-color: ${primaryColors.accentBackground};

    .dropdown {
      position: absolute;
      top: 5px;
      right: 20px;
      font-size: 24px;

      button {
        padding: 0;
        border: none;
        background: none;
        outline: none;
        cursor: pointer;
      }

      .menu {
        display: none;
        position: absolute;
        top: 30px;
        right: 0;
        min-width: 70px;
        background: #fff;
        border: 1px solid rgba(34, 36, 38, 0.15);
        border-radius: 5px;

        .item {
          padding-left: 10px;
          width: 100%;
          line-height: 28px;
          font-size: 14px;
          /* font-weight: 600; */
          color: rgba(0, 0, 0, 0.43);
          text-transform: uppercase;
          cursor: pointer;

          &:hover {
            background: rgba(0, 0, 0, 0.05);
            font-weight: 600;
            color: #666;
          }
        }

        &:hover {
          display: block;
        }
      }

      .trigger {
        color: #666;
        outline: none;
        cursor: pointer;

        &:focus + .menu {
          display: block;
        }
      }
    }

    h4 {
      max-width: 80%;
      color: #666;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 600;
    }

    p {
      color: #666;
      font-weight: 600;
      font-size: 14px;
    }

    .subline {
      display: flex;
      align-items: center;
      margin-top: 5px;
      margin-bottom: 5px;

      img {
        margin-right: 10px;
      }

      span {
        text-transform: uppercase;
        color: #989898;
        font-weight: 600;
      }
    }

    .addButt {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      text-align: center;

      .plus {
        height: 50px;
        width: 50px;

        font-size: 36px;
        font-weight: 100;
        color: #c8d8d7;
        line-height: 39px;
        border: 2px solid #c8d8d7;
        border-radius: 50%;
        cursor: pointer;
      }

      .add {
        margin-top: 15px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        color: #bbb;
      }
    }
  }
`;
