import styled from "styled-components";
import {
  colors,
  primaryColors,
  fontColors,
  boxShadow
} from "./constants/colors";

export default styled.div`
  transition: 0.6s;
  margin-bottom: 80px;

  &.loading {
    .preloader {
      opacity: 1;
      visibility: visible;
    }
    .ui.grid {
      opacity: 0;
    }
  }

  .preloader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
  }

  .projectLogo {
    max-width: 80px;
    margin: 0 20px 0 10px;

    & > div {
      margin-bottom: 0;
    }

    .imgPreview {
      display: inline-block;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      .image-preloader {
        padding: 0;
      }

      & img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .ui.button {
      padding: 35px !important;
    }
  }

  .ui.grid {
    transition: inherit;

    .row {
      .column {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;

        & > div {
          padding: 20px;
          background: #fff;
          border-radius: 3px;
          ${boxShadow.light};

          &.projectAside {
            flex: 0 0 350px;
            margin-right: 20px;

            .asideInfo {
              /* padding-top: 14px; */
              font-size: 18px;
              border-bottom: 1px solid #f1f1f5;
              padding-bottom: 20px;
              margin-bottom: 20px;

              &:last-of-type {
                border: none;
              }

              .label {
                font-weight: 500;
                margin-bottom: 13px;
                color: ${fontColors.black};

                &.assignTeam {
                  color: ${primaryColors.lightGrey};
                }
              }

              .text {
                color: ${fontColors.regular};
                font-weight: 400;
              }

              .teamWrapper {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;

                .project-team {
                  display: flex;
                  flex-flow: row nowrap;
                  align-items: center;

                  .allMembers {
                    margin-right: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 30px;
                    width: 30px;
                    border-radius: 50%;
                    background: ${colors.blue};
                    color: white;
                    cursor: pointer;
                    z-index: 1;
                  }
                }
              }

              .skillsWrapper {
                display: flex;
                flex-flow: row wrap;

                .skill {
                  padding: 0px 15px;
                  background: ${primaryColors.accentBackground};
                  border: 1px solid #edeff6;
                  color: ${fontColors.blue.inert};
                  border-radius: 20px;
                  white-space: nowrap;
                  font-size: 14px;
                  line-height: 27px;
                  margin-left: 10px;
                  margin-bottom: 10px;
                }
              }

              .projectSkills {
                & > span {
                  padding-left: 0;
                  font-size: 1.2em;
                  font-weight: 500;
                  color: ${primaryColors.darkGrey};
                  text-transform: none;
                }

                .Select-multi-value-wrapper {
                  border-top-width: 1px;
                }
              }

              .projectFiles {
                & > p {
                  margin-bottom: 0;
                }
              }
            }
          }
          &.projectMain {
            flex: 1 1 auto;

            .title {
              font-size: 24px;
              font-weight: 500;
              line-height: 27px;
              margin-bottom: 20px;
              color: ${fontColors.black};
            }

            .projectHeader {
              position: relative;
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              margin-bottom: 2em;

              img,
              .projectNoLogo {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                object-fit: cover;
              }

              .projectNoLogo {
                background: linear-gradient(
                  to top left,
                  #00a2ee 0%,
                  #00e1ce 100%
                );
              }

              p {
                font-size: 24px;
                color: ${fontColors.black};
                line-height: 27px;
                font-weight: 500;
              }

              .status {
                color: ${primaryColors.accentGrey};
                opacity: 0.8;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
              }
            }

            .controls {
              display: flex;
              justify-content: flex-end;

              button.draft {
                margin-right: 20px;
              }
            }
          }

          .projectNoLogo {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
          }

          .projectNoLogo {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: 64px;
            width: 70px;
            height: 70px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: -1px;
            text-align: center;
            background-color: ${primaryColors.accentBackground};
            color: #fff;
          }
        }
      }
    }
  }
`;
