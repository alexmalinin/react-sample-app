import styled from "styled-components";
import {
  colors,
  boxShadow,
  primaryColors,
  fontColors
} from "../constants/colors";

export default styled.div`
  border-radius: 0 !important;
  position: relative;
  margin-bottom: ${props => (props.small ? `7px` : `10px`)};
  /* padding-top: 28px; */
  padding-bottom: 20px;

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
    border-right: 2px solid ${colors.blue};
    border-bottom: 2px solid ${colors.blue};
    height: 20px;
    width: 12px;
    transform: rotate(45deg);
  }

  label {
    font-size: ${props => (props.accountInput ? `10px` : `18px`)};
    text-transform: none;
    color: ${props => (props.accountInput ? `#999` : fontColors.black)};
    font-weight: ${props => (props.accountInput ? `normal` : `500`)};
  }

  &.moduleName {
    margin-top: 20px;
  }

  .ui.input {
    width: 100%;
    input {
      &.shadowInput {
        display: none;
      }
    }

    &.error {
      input {
        color: ${fontColors.light};
        background-color: transparent;
        border-color: ${primaryColors.red};

        &::placeholder {
          color: ${fontColors.light};
        }
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
        border-bottom-color: ${colors.blue};
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
          background: ${colors.blue};

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
            background-color: ${colors.lightBlue};
          }
        }
      }
    }
  }

  .Select-input {
    height: 38px;
    ${props => (props.small ? `width: 200px;` : ``)};
  }

  .Select-placeholder,
  .Select-value {
    color: ${props => (props.accountInput ? `#666` : fontColors.light)};
    padding-left: ${props => (props.accountInput ? `0px` : `10px`)};
    text-transform: none;
    letter-spacing: 0.5px;
    font-size: 16px;
    max-width: 90%;
  }

  .Select-placeholder,
  .Select-value-label {
    line-height: 38px;
  }

  .Select-value-label {
    color: ${fontColors.regular};
  }

  .Select-input > input {
    font-size: 16px;
    padding: 0;
    line-height: 38px;
    color: ${fontColors.regular};
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
        margin-bottom: 15px;
        overflow: hidden;
        resize: none;
        min-height: auto;
        letter-spacing: normal;
        border: 1px solid var(--inputbdcolor, transparent);
        cursor: pointer;

        &:focus {
          --inputbdcolor: ${colors.blue};
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
        border-color: ${colors.blue};
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
