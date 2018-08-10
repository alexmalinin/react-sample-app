import styled from "styled-components";
import { colors, fontColors } from "../constants/colors";

export default styled.div`
  .react-phone-number-input {
    .react-phone-number-input__country.rrui__select--collapsed {
      padding: 7px 10px;
      border: 1px solid ${colors.lightGreyBlue};
      border-radius: 6px;
      max-height: 38px;

      .react-phone-number-input__icon {
        fill: ${colors.blue};
        font-size: 18px;
      }
    }

    .rrui__input {
      height: auto;
    }

    .rrui__select__button {
      border: none;
    }

    input {
      border: 1px solid ${colors.lightGreyBlue};
      border-radius: 6px;
      font-size: 16px;
      height: 38px;
      padding: 8px 10px;
      line-height: 22px;
      color: ${fontColors.regular};

      &::placeholder {
        font-size: 16px;
        font-weight: 400;
        color: ${fontColors.light};
      }

      &:focus {
        border-color: ${colors.blue};
      }
    }

    .rrui__select__options {
      border: 1px solid ${colors.blue};
      max-width: 100%;
      left: 0;

      .rrui__select__options-list-item {
        font-size: 16px;
        color: ${fontColors.regular};

        .rrui__select__option:hover {
          background-color: ${colors.lightGreyBlue};
        }

        .rrui__select__option--focused {
          background-color: ${colors.lightGreyBlue};
        }
      }
    }
  }
`;
