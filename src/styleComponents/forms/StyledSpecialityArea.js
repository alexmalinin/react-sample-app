import styled from "styled-components";

export default styled.div`
  margin-bottom: 15px;

  & > div {
    div .checkbox-error {
      display: none;
    }

    div:first-child .checkbox-error {
      display: block;
    }
  }

  p {
    font-size: 12px !important;
    text-transform: uppercase;
    font-weight: bold;
    color: #666;
    padding-left: 10px;
  }

  & > div {
    display: block;
    margin-left: 0;
    color: #666;
  }

  @media (max-width: 1920px) {
    margin-bottom: 15px;

    p {
      font-size: 14px;
    }
  }
`;
