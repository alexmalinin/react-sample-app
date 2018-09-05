import styled, { css } from "styled-components";
import { Button } from "semantic-ui-react";

export default styled(Button)`
  &.ui.primary.button {
    border-radius: 0;
    width: calc(100% + 122px);
    margin-left: -61px;
    margin-bottom: -14px;
    font-size: 24px;
    font-family: Roboto, sans-serif;
    text-align: center;
    color: #fff;
    ${props =>
      props.passwordForm &&
      css`
        width: 200% !important;
        margin: 0 !important;
      `};

    @media (max-width: 1920px) {
      width: calc(100% + 82px);
      margin-left: -41px;
    }

    @media (max-width: 1024px) {
      width: calc(100% + 42px);
      margin-left: -21px;
    }

    @media (max-width: 991px) {
      ${props =>
        props.passwordForm &&
        css`
          width: 100% !important;
        `};
    }

    @media (max-width: 767px) {
      width: auto;
      margin-left: -1px;
      color: #000;
      background: #fff;
      padding: 13px 45px;
      border-radius: 50px;
      border: 1px solid #1991fa;

      &:active {
        background: #1991fa;
        color: #fff;
      }
    }
  }
`;
