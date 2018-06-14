import styled from "styled-components";
import { colors, primaryColors, boxShadow } from "./constants/colors";

export default styled.div`
  transition: 0.6s;

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
    max-width: 100px;

    & > div {
      margin-bottom: 0;
    }

    .imgPreview {
      display: inline-block;

      .image-preloader {
        padding: 0;
      }

      & img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        border-radius: 50%;
        object-fit: ${props => (props.projectLogo ? "contain" : "cover")};
      }
    }

    .ui.button {
      padding: 40px !important;
    }
  }

  .ui.grid {
    transition: inherit;
    .row {
      .column {
        display: flex;
        flex-flow: row nowrap;

        & > div {
          padding: 20px;
          background: #fff;
          border-radius: 1px;
          border-radius: 1px solid ${primaryColors.accentGrey};

          &.projectAside {
            flex: 0 0 350px;
            margin-right: 20px;

            .asideInfo {
              padding-top: 14px;
              padding-bottom: 8px;
              border-bottom: 1px solid rgba(152, 158, 169, 0.2);

              &:last-of-type {
                border: none;
              }

              & > p {
                font-size: 1.2em;
                font-weight: 500;
                color: ${primaryColors.accentGrey};
              }

              .label {
                color: ${primaryColors.darkGrey};

                &.assignTeam {
                  color: ${primaryColors.lightGrey};
                }
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
                    background: ${colors.darkBlue};
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
                  padding: 0 8px;
                  border: 1px solid #dae1ee;
                  border-radius: 12px;
                  white-space: nowrap;
                  font-size: 0.9em;
                  line-height: 1.4em;
                  margin-left: 6px;
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
              position: relative;
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              padding: 8px;
              margin-bottom: 2em;

              img,
              .projectNoLogo {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                margin-right: 10px;
                object-fit: contain;
              }

              img {
                background: #fff;
              }

              .projectNoLogo {
                display: inline-block;
                font-size: 64px;
                font-weight: 600;
                text-transform: uppercase;
                line-height: 72px;
                letter-spacing: -1px;
                text-align: center;
                background: linear-gradient(
                  to top left,
                  #00a2ee 0%,
                  #00e1ce 100%
                );
                color: #fff;
              }

              p {
                font-size: 1.6em;
                color: ${primaryColors.darkGrey};
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
            }
          }
        }
      }
    }
  }
`;
