import styled, { css } from "styled-components";
import Select from "react-select";
import { primaryColors } from "../constants/colors";

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
    border-bottom: 2px solid #85b7d9;
    box-shadow: none;
  }

  &.has-value .Select-value-label {
    color: #666 !important;
  }

  .Select-arrow::before,
  .Select-arrow::after {
    content: "";
    width: 12px;
    height: 2px;
    position: absolute;
    top: 50%;
    right: 0;
    background: #ccc;
    transform: rotate(45deg);
    transform-origin: 0;
  }

  &.is-open .Select-arrow {
    transform: rotate(-90deg);
  }

  .Select-arrow::before {
    transform: rotate(-45deg);
  }

  & .Select-control {
    border-radius: 0;
    border: none;
    ${props =>
      props.formodal
        ? "border: 1px solid #dae1ee; border-radius: 3px"
        : "border-bottom: 2px solid #f2f2f2;"};
  }

  ${props =>
    props.error &&
    css`
      & .Select-control {
        border-color: #e0b4b4;
        background-color: #fff6f6;
      }

      & .Select-placeholder {
        color: #e7bdbc;
      }
    `};
`;
