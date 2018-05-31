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

  .ui.grid {
    transition: inherit;
    .row {
      .column {
        & > div {
          padding: 20px;
          background: #fff;
          border-radius: 1px;
          ${boxShadow.light};

          &.projectAside {
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
            .title {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              padding: 8px;

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
            }

            .controls {
              display: flex;
              justify-content: flex-end;

              .dv-blue {
                width: 140px;
              }
            }
          }
        }
      }
    }
  }
`;
