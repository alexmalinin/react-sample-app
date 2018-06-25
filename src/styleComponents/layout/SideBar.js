import styled from "styled-components";
import {
  boxShadow,
  colors,
  primaryColors,
  fontColors
} from "../constants/colors";

export const StyledBar = styled.aside`
  position: fixed;
  z-index: 998;
  display: flex;
  top: 87px;

  width: 100%;
  max-width: 240px;
  height: calc(100vh - 87px);

  background-color: white;
  color: #b3b3b3;
  ${boxShadow.light};

  transition: 0.4s ease-in-out, height 0s;
  outline: none;

  &.left {
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-flow: column nowrap;

    .title {
      z-index: 1;
      flex: 0 0 60px;
      display: flex;
      align-items: center;
      padding: 0 22px;

      text-transform: uppercase;
      color: ${colors.darkBlue};

      h4 {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.88px;
      }
    }

    .projects {
      flex: 1 1 auto;
      display: flex;
      flex-flow: column nowrap;

      transition: 0.3s ease-in-out;

      .project-wrapper {
        position: relative;
        display: flex;
        flex-flow: column nowrap;

        .project-link {
          position: relative;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;

          text-align: center;

          .add-project-label {
            position: absolute;
            color: #666;
            text-align: center;
            text-transform: uppercase;
          }

          .project-logo,
          .add-project {
            height: 50px;
            width: 50px;
            margin: 5px 12px;

            border-radius: 50%;
            border: 1px solid #ccc;
          }

          img {
            object-fit: cover;
            background: #fff;
          }

          .project-logo.no-logo {
            display: inline-flex;
            justify-content: center;
            align-items: center;

            font-size: 40px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: -1px;
            text-align: center;

            background: linear-gradient(to top left, #00a2ee 0%, #00e1ce 100%);
            color: #fff;
          }

          .project-name {
            padding-left: 8px;

            font-size: 18px;
            color: ${fontColors.black};
            font-weight: 500;

            transition: 0.4s;

            .projectStatus {
              position: absolute;
              bottom: 0;
              left: 15px;

              font-size: 12px;
              color: #ccc;
              text-transform: none;
            }
          }

          .add-project {
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

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%) rotate(var(--rotate, 45deg));

            height: 10px;
            width: 10px;

            border: solid ${colors.blue};
            border-width: 0 0 2px 2px;

            opacity: 0;
            visibility: hidden;
            transition: 0.4s;
          }

          &:hover {
            &::after {
              opacity: 1;
              visibility: visible;
            }
          }

          &.active {
            background: ${primaryColors.accentBackground};

            &::after {
              opacity: 1;
              visibility: visible;
              --rotate: -45deg;
            }

            & + .modules {
              display: flex;
            }
          }
        }

        .modules {
          display: none;
          flex-flow: column nowrap;
          padding: 7px 7px 7px 36px;

          color: ${fontColors.regular};
          font-size: 16px;
          font-weight: 400;

          animation: fadeIn 0.2s forwards;
          opacity: 0;

          .project-epic {
            display: block;
            margin: 3px 0;
            color: inherit;

            &.active {
              color: ${fontColors.blue.active};
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
          right: calc(100% + 15px);
          &::before,
          &::after {
            left: 15px;
          }
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
        transform: rotate(var(--rotate, 0));
      }

      &::before {
        --rotate: -45deg;
        top: calc(50% - 1px);
      }

      &::after {
        --rotate: -135deg;
        top: calc(50% + 1px);
      }

      &:hover {
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
            border-bottom: 4px solid ${colors.blue};
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

            .delete,
            .dropdown {
              max-width: 220px;
              min-width: 220px;
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

  /* @media screen and (max-width: 1290px) {
    display: none;
  } */
`;
