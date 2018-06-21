import styled from "styled-components";
import { primaryColors, secondaryColors } from "./constants/colors";

export default styled.div`
  font-family: "Roboto", medium;
  margin-top: 10px;
  padding-bottom: 1rem;

  & > .form-title {
    font-size: 1.5rem;
    text-transform: uppercase;
    color: ${primaryColors.darkGrey};
    line-height: 3rem;
  }

  & > .form-subtitle {
    font-size: 1.2rem;
    color: ${primaryColors.lightGrey};
  }
`;
