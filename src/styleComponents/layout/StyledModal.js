import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import { primaryColors, colors } from "../constants/colors";

export default styled(Modal)`
  &.ui.modal {
    & > .close {
      top: 14px;
      right: 14px;
      border: none;
      background: none;
      position: absolute;

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 7px;
        height: 1px;
        width: 21px;
        background: #666;
        transform: rotate(var(--rotate, 0));
      }

      &::before {
        --rotate: 45deg;
      }

      &::after {
        --rotate: -45deg;
      }
    }
    .modalHeader {
      padding: 0 21px;
      text-transform: uppercase;
      color: ${primaryColors.darkGrey};

      &.centered {
        text-align: center;
      }
    }

    form {
      .ui.grid.float {
        .row {
          padding: 0;

          .column {
            .transparent.clear {
              /* margin-bottom: 0; */
            }
          }

          .ui.input {
            &.disabled {
              input {
                border: none;
              }
            }
          }
        }
      }
      .dv-blue:not(.fluid) {
        position: absolute;
        bottom: 0;
        right: 14px;
      }
    }

    .specialistsWrapper {
      .totalCostWrapper {
        .totalCosts {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${primaryColors.darkGrey};

          .label {
            text-transform: uppercase;
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 0;
          }

          .total {
            font-size: 16px;
            font-weight: bold;

            i {
              color: ${colors.darkBlue};
              margin-right: 5px;
            }
          }
        }

        .fees {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;

          .ui.checkbox {
            padding: 5px 0;
            line-height: 24px;
            transition: 0.2s;

            &:not(.checked) {
              label {
                color: #ccc;
              }
            }

            label {
              font-size: 20px;
              color: ${primaryColors.darkGrey};
              opacity: 1;

              &::before,
              &::after {
                height: 24px;
                width: 24px;
                color: ${colors.darkBlue};
                font-size: 18px;
              }
            }
          }
        }
      }

      .specialistsInnerWrapper {
        max-height: 230px;
        overflow-y: auto;

        .ui.grid {
          margin-top: -10px;
          margin-bottom: -10px;
        }

        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(72, 97, 242, 0.2);

          &:hover {
            background: rgba(72, 97, 242, 0.4);
          }
        }

        &::-webkit-scrollbar-track {
          background: rgba(72, 97, 242, 0.1);
        }
      }
    }

    &.addTask {
      .specialistsWrapper {
        padding-left: 20px;
      }
    }
  }
`;
