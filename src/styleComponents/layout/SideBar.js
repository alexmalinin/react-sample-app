import styled from "styled-components";
import { primaryColors } from "../constants/colors";

export const StyledBar = styled.aside`
  position: fixed;
  z-index: 999;
  display: flex;
  top: 87px;

  width: 100%;
  max-width: 240px;
  height: calc(100vh - 87px);

  background-color: white;
  color: #b3b3b3;
  box-shadow: 0px 0px 24px 0px rgba(204, 204, 204, 1);
  transition: 0.4s ease-in-out, height 0s;
  outline: none;

  &.left {
    left: 0;
    overflow-y: auto;
    display: flex;
    overflow-x: hidden;

    .innerWrapper {
      display: grid;
      grid-template-rows: 34px 1fr;
      width: 100%;

      .title {
        z-index: 1;
        padding: 10px 0;
        text-align: center;
        text-transform: uppercase;
        color: #666;
        border-bottom: 1px solid #f2f2f2;

        h4 {
          font-size: 1em;
          font-weight: 500;
        }
      }

      .projects {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        min-height: 100%;
        height: 100%;
        width: 80px;
        background: #f2f2f2;
        transition: 0.3s ease-in-out;
        padding-top: 5px;

        &.opened {
          width: 100%;
        }

        .projectWrapper {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          /* height: 70px; */
          width: 80px;

          &:hover {
            .projectName {
              color: #4f5bf0;
            }
          }
          .modules {
            position: relative;
            top: 0;
            left: calc(100% + 15px);
            display: flex;
            flex-flow: column nowrap;
            min-width: 130px;
            height: 100%;
            text-transform: uppercase;
            color: #666;
            font-weight: 500;
            letter-spacing: 1px;
            animation: fadeIn 0.2s 0.4s forwards;
            transition: max-height 0.5s;
            opacity: 0;

            a {
              display: block;
              color: inherit;
              margin: 3px 0;

              &.active {
                color: #4f5bf0;
                font-weight: 600;
              }
            }
          }
        }
        .projectLink,
        .addProject {
          position: relative;
          margin: 5px 0;
          width: 80px;
          text-align: center;

          img,
          .projectNoLogo,
          .addProject {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            border: 3px solid #ccc;
          }
          img {
            object-fit: contain;
          }
          .projectNoLogo {
            display: inline-block;
            font-size: 40px;
            font-weight: 600;
            text-transform: uppercase;
            line-height: 52px;
            letter-spacing: -1px;
            text-align: center;
            background: linear-gradient(to top left, #00a2ee 0%, #00e1ce 100%);
            color: #fff;
          }
          .projectName {
            position: absolute;
            display: inline-flex;
            align-items: center;
            top: 0;
            left: 100%;
            height: 100%;
            width: 140px;
            max-width: 140px;
            padding-left: 15px;
            text-align: left;
            text-transform: uppercase;
            color: #666;
            font-weight: 900;
            letter-spacing: 1px;
            transition: 0.4s;
          }
          .addProject {
            display: inline-block;

            &::before,
            &::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              height: 26px;
              width: 2px;
              background: #ccc;
            }
            &::after {
              height: 2px;
              width: 26px;
            }
          }

          &.active {
            & > img,
            .projectNoLogo {
              border: 3px solid #4f5bf0;
            }
            &::after {
              content: "";
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 2px;
              height: 5px;
              width: 5px;
              border-radius: 50%;
              background: #4f5bf0;
            }
          }
        }
      }
    }
  }

  &.right {
    right: 0;

    transform: translateX(100%);

    &.open {
      transform: translateX(0);

      &:hover {
        .trigger {
          right: calc(100% - 14px);
        }
      }

      .trigger {
        right: calc(100% - 30px);
        &::before {
          top: calc(50% - 8px);
        }
        &::after {
          top: calc(50% + 8px);
        }
        &:hover {
          right: calc(100% + 15px);
          &::before,
          &::after {
            left: 15px;
          }
        }
      }
    }

    .trigger {
      position: absolute;
      top: 50%;
      right: 100%;

      height: 200px;
      width: 120px;
      border-radius: 50%;
      border: none;
      background: #ababab;
      transform: translate(75%, -50%);
      transition: 0.4s;
      outline: none;
      opacity: 0.7;
      cursor: pointer;

      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 30px;

        height: 24px;
        width: 4px;
        border-radius: 4px;
        background: #fff;
        transform-origin: center 0;
        transition: 0.4s;
      }

      &::before {
        transform: rotate(-45deg);
        top: calc(50% - 1px);
      }

      &::after {
        transform: rotate(-135deg);
        top: calc(50% + 1px);
      }

      &:hover {
        /* transform: translate(65%, -50%); */
        right: calc(100% + 15px);
        opacity: 1;

        &::before,
        &::after {
          left: 15px;
        }
      }
    }

    & > div {
      width: 100%;
      .ui.attached.tabular.menu {
        border: none;

        .item {
          display: inline-block;
          width: 50%;
          font-size: 14px;
          color: #b3b3b3;

          border: none;
          border-bottom: 2px solid #f2f2f2;

          text-align: center;

          &:first-of-type {
            border-right: 2px solid #f2f2f2;
          }

          &.active {
            color: #666;
            border-radius: 0px !important;
            border-bottom: 4px solid #00ffc0;
          }
        }
      }
      .attached.segment.tab {
        padding: 20px;
        border: none;
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        max-height: calc(100% - 44px);

        .team-tab-project {
          margin-bottom: 30px;

          h4 {
            color: #666;
            margin-bottom: 0;
          }

          h5 {
            margin-top: 10px;
            margin-bottom: 10px;
          }

          .persons {
            display: flex;
            flex-flow: row wrap;
            align-items: center;

            h5 {
              flex-basis: 100%;
            }
            .attached.segment.tab {
              position: relative;
              padding: 20px;
              border: none;
              height: 100%;
              overflow-y: auto;
              max-height: calc(100% - 44px);

              &.locked {
                overflow-x: hidden;
                overflow-y: auto;
              }

              .team-tab-project {
                margin-bottom: 30px;

                h4 {
                  color: #666;
                  margin-bottom: 0;
                }

                h5 {
                  margin-top: 10px;
                  margin-bottom: 10px;
                }

                .persons {
                  display: flex;
                  flex-flow: row wrap;
                  align-items: center;

                  h5 {
                    flex-basis: 100%;
                  }

                  .delete,
                  .dropdown {
                  }

                  .person {
                    flex-basis: 20%;
                    text-align: center;

                    img,
                    span {
                      display: inline-block;
                      width: 30px;
                      height: 30px;
                      border: 1px solid #e5e5e5;
                      border-radius: 50%;
                    }
                    span {
                      text-align: center;
                      font-size: 24px;
                      line-height: 22px;
                      cursor: pointer;
                    }
                  }
                }
              }

              .activity-tab-item {
                text-transform: uppercase;
                margin-bottom: 60px;

                h4 {
                  font-size: 15px;
                  color: #666;
                }

                .activity-item {
                  display: flex;
                  flex-flow: row wrap;
                  align-items: center;
                  margin-bottom: 20px;

                  h5 {
                    flex-basis: 100%;
                  }

                  .person {
                    flex-basis: 20%;

                    img {
                      height: 30px;
                      width: 30px;
                      border: 1px solid #e5e5e5;
                      border-radius: 50%;
                    }
                  }

                  .text {
                    flex-basis: 80%;
                    font-size: 12px;

                    span:last-of-type {
                      text-transform: none;
                    }
                  }
                }
              }
            }
          }
        }

        .activity-tab-item {
          text-transform: uppercase;
          margin-bottom: 60px;

          h4 {
            font-size: 15px;
            color: #666;
          }

          .activity-item {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            margin-bottom: 20px;

            h5 {
              flex-basis: 100%;
            }

            .person {
              flex-basis: 20%;

              img {
                height: 30px;
                width: 30px;
                border: 1px solid #e5e5e5;
                border-radius: 50%;
              }
            }

            .text {
              flex-basis: 80%;
              font-size: 12px;

              span:last-of-type {
                text-transform: none;
              }
            }
          }
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1820px) {
    &.right {
      /* display: none; */
    }
  }

  @media (max-width: 1440px) {
    &.left {
      max-width: 80px;
      overflow-x: hidden;
      overflow-y: hidden;

      .projects {
        .projectName {
          display: none;
        }

        .modules {
          max-height: 0;
        }
      }

      &:hover {
        max-width: 240px;
        overflow-y: auto;

        .modules {
          max-height: 500px;
        }
      }
    }
  }

  @media screen and (max-width: 1290px) {
    display: none;
  }
`;
