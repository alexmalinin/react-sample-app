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
    props.small ? `display: inline-block; margin: 20px 40px 0 20px` : ``};
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
    font-family: "Brix";
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

    .react-datepicker {
      border: none;
      ${boxShadow.dark};
      border-radius: 0;
      font-family: "Brix";
      .react-datepicker__header {
        border-bottom: none;
        border-radius: inherit;
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
      .react-datepicker__input-container {
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

  .Select-value-label {
    color: #ccc !important;
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
          --inputbdcolor: ${primaryColors.lightGrey};
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
        font-size: 0.9em;
        line-height: 2em;
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
      }
    }
  }
`;
