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
          }
          &.projectMain {
            .title {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
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
                font-size: 1.4em;
                font-weight: 500;
                color: ${primaryColors.darkGrey};
              }
            }
          }
        }
      }
    }
  }
`;
