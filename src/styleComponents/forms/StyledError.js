import styled, { css } from "styled-components";

export default styled.span`
  color: #db4538;
  position: absolute;
  top: 0px;
  right: ${props => (props.paddedError ? "35px" : "0px")};
  font-size: 14px;
  font-weight: 300;

  @media (min-width: 1921px) {
    top: -22px;
    font-size: 20px;
  }
`;
