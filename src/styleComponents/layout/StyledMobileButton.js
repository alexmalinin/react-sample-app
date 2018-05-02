import styled from "styled-components";
import { Button } from "semantic-ui-react";

export default styled(Button)`
  &.ui.button {
    display: none;
    margin: 0;
    padding: 0 5px;
    background: transparent;
    font-size: 23px;
    color: #fff;

    &:active,
    &:focus,
    &:hover {
      color: #fff;
      background-color: transparent;
    }

    i.icon {
      margin: 0 !important;
      padding: 0;
      opacity: 1;
    }
  }

  @media (max-width: 991px) {
    &.ui.button {
      display: block;
    }
  }
`;
