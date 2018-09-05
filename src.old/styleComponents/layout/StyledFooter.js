import styled from "styled-components";
import * as constants from "../constants/colors";

export const SFooter = styled.footer`
  background: ${constants.blueColor};
  padding: 35px 0;
  color: #fff;
  font-size: 20px;

  p {
    margin: 20px 0 90px;
  }

  @media (max-width: 1920px) {
    font-size: 16px;

    p {
      margin: 15px 0 60px;
    }
  }

  @media (max-width: 1200px) {
    p br {
      display: none;
    }
  }

  @media (max-width: 767px) {
    font-size: 14px;

    p {
      text-align: justify;
      margin: 10px 0 20px;
    }
  }
`;
