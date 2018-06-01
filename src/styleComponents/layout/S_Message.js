import styled from "styled-components";
import { Message } from "semantic-ui-react";

export const S_Message = styled(Message)`
  &.ui.message {
    position: fixed;
    top: -80px;
    margin-top: 0;
    right: 22px;
    z-index: 999;
    transition: top 0.5s ease-in-out;
    ${props => (props["data-show"] ? `top: 95px` : ``)};
  }
`;
