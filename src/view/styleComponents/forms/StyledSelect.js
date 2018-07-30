import styled, { css } from "styled-components";
import Select from "react-select";
import { fontColors, colors, primaryColors } from "../constants/colors";

export default styled(Select)`
  .Select-control:focus {
    border-bottom: 5px solid red;
  }

  .Select-control:hover {
    box-shadow: none;
  }

  .Select-control .Select-value {
    padding-right: 30px !important;
  }

  .Select-arrow {
    border-style: none;
    border-width: 0;
    transition: 0.4s;
    height: 100%;
    width: 10px;
  }

  &.is-focused:not(.is-open) .Select-control {
    box-shadow: none;
  }

  .Select-arrow::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%) rotate(var(--rotate, 45deg));
    height: 10px;
    width: 10px;
    border: solid ${colors.blue};
    border-width: 0 0 2px 2px;
    transition: 0.4s;
  }

  &.is-open {
    .Select-arrow:after {
      --rotate: -45deg;
    }

    .Select-control {
      border-color: ${colors.blue};
    }
  }

  .Select-arrow::before {
    transform: rotate(-45deg);
  }

  & .Select-control {
    border: 1px solid ${colors.lightGreyBlue};
    border-radius: 6px;
  }

  ${props =>
    props.error &&
    css`
      & .Select-control {
        border-color: ${primaryColors.red};
      }
    `};

  .Select-menu-outer {
    border: 1px solid ${colors.blue};

    .Select-option {
      font-size: 16px;
      color: ${fontColors.regular};

      &.is-focused {
        background-color: ${colors.lightGreyBlue};
      }

      &:hover {
        background-color: ${colors.lightGreyBlue};
      }
    }
  }
`;
