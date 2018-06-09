import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import { primaryColors } from "../constants/colors";

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
    }
    form {
      .ui.grid.float {
        .row {
          padding: 0;
        }
      }
      .dv-blue {
        position: absolute;
        bottom: 0;
        right: 14px;
      }
    }
  }
`;
