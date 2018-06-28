import styled from "styled-components";
import {
  secondaryColors,
  colors,
  boxShadow,
  primaryColors
} from "../constants/colors";

export default styled.div`
  border-radius: 0 !important;
  position: relative;
  margin-bottom: ${props => (props.small ? `7px` : `20px`)};
  padding-top: 20px;

  ${props => (props.padded ? `padding-left: 20px; padding-right: 20px; ` : ``)};
  ${props =>
    props.small ? `display: inline-block; margin: 20px 40px 0 0` : ``};
  & > div.checkedd:after {
    content: "";
    position: absolute;
    right: 15px;
    top: calc(50% - 5px);
    width: 18px;
    height: 18px;
    background: url("../../images/tick.png");
    background-size: cover;
  }

  & > div.checked:after {
    content: "";
    position: absolute;
    right: 15px;
    top: calc(50% - 15px);
    border-right: 2px solid ${secondaryColors.green};
    border-bottom: 2px solid ${secondaryColors.green};
    height: 20px;
    width: 12px;
    transform: rotate(45deg);
  }

  label {
    position: absolute;
    top: 0;
    left: ${props =>
      props.accountInput ? `0` : props.padded ? `30px` : `10px`};
    font-family: "Roboto";
    font-size: ${props => (props.accountInput ? `10px` : `12px`)};
    text-transform: uppercase;
    color: ${props => (props.accountInput ? `#999` : `#666`)};
    font-weight: ${props => (props.accountInput ? `normal` : `600`)};
  }

  &.moduleName {
    margin-top: 20px;
  }

  .ui.input {
    width: 100%;
    input {
      border: none;
      border-bottom: 2px solid #f2f2f2;
      font-size: 16px;
      color: #666;
      letter-spacing: 1.5px;
      padding-left: 10px;
      border-radius: 0;

      &.shadowInput {
        display: none;
      }
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }

    input[name="cost"] {
      text-align: right;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    input[name="eta"],
    input[name="expiry_date"] {
      cursor: pointer;
      width: 145px;
    }

    .react-datepicker-popper {
      .react-datepicker__triangle {
        margin-top: -7px;
        border-bottom-color: ${colors.darkBlue};
        &::before {
          border-bottom-color: inherit;
        }
      }
      .react-datepicker {
        border: none;
        ${boxShadow.dark};
        border-radius: 0;
        font-family: "Roboto";

        .react-datepicker__navigation {
          &.react-datepicker__navigation--previous {
            border-right-color: #fff;
          }
          &.react-datepicker__navigation--next {
            border-left-color: #fff;
          }
        }

        .react-datepicker__header {
          border-bottom: none;
          border-radius: inherit;
          background: ${colors.darkBlue};

          .react-datepicker__current-month {
            color: white;
          }

          .react-datepicker__day-names {
            .react-datepicker__day-name {
              color: white;
              font-weight: 600;
            }
          }
        }

        .react-datepicker__day {
          &:hover {
            border-radius: 0;
          }

          &.react-datepicker__day--selected {
            border-radius: inherit;
            background-color: ${colors.blue};
          }
        }
      }
    }
  }

  .Select-input {
    height: 41px;
    ${props => (props.small ? `width: 200px;` : ``)};
  }

  .Select-placeholder,
  .Select-value {
    color: ${props => (props.accountInput ? `#666` : `#ccc !important`)};
    padding-left: ${props => (props.accountInput ? `0px` : `10px`)};
    text-transform: none;
    letter-spacing: 1.5px;
    font-size: 16px;
    max-width: 90%;
  }

  .Select-placeholder,
  .Select-value-label {
    line-height: 42px;
  }

  .Select-value-label {
    color: #ccc !important;
  }

  .Select-input > input {
    padding: 0;
    line-height: 41px;
  }

  .Select-arrow-zone {
    vertical-align: unset;
  }

  &.transparent {
    label {
      left: 7px;
    }

    &.clear {
      label {
        left: 0;
      }

      .ui.input {
        input {
          --inputbdcolor: rgba(32, 36, 38, 0.15);

          &:hover {
            --inputbdcolor: rgba(32, 36, 38, 0.4);
          }
        }
      }
    }

    .ui.input {
      input {
        padding: 6px;
        margin-bottom: 15px;
        overflow: hidden;
        resize: none;
        min-height: auto;
        letter-spacing: normal;
        color: ${primaryColors.accentGrey};
        font-weight: 400;
        font-size: 15px;
        line-height: 2em;
        font-family: "Roboto";
        border: 1px solid var(--inputbdcolor, transparent);
        border-radius: 5px;
        cursor: pointer;

        &::placeholder {
          color: ${primaryColors.accentGrey};
        }

        &:focus {
          --inputbdcolor: ${colors.darkBlue};
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
          cursor: text;
        }

        &:not(:disabled):hover {
          background: rgba(0, 0, 0, 0.02);
        }
      }

      &.disabled {
        opacity: 1;

        .react-datepicker-wrapper {
          input {
            border: none;
            padding-left: 0;
          }
        }
      }

      &.error {
        input {
          &:focus {
            --inputbdcolor: ${primaryColors.red};
          }
        }
      }

      .react-datepicker-wrapper {
        .react-datepicker__input-container {
          input {
            padding-left: 1em;
            line-height: 24px;

            &:hover {
              background: transparent;
            }
          }
        }
      }
    }

    .ui.dropdown.selection {
      &.active {
        border-color: ${colors.darkBlue};
        .menu {
          border-color: inherit;
        }
      }
      &.disabled {
        border-color: transparent;
        padding-left: 0;

        i.dropdown.icon {
          opacity: 0;
          visibility: hidden;
        }
      }
    }
  }
`;
