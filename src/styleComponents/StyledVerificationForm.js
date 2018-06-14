import styled from "styled-components";

export default styled.form`
  width: 100%;

  & > div {
    margin-bottom: 60px;
  }

  .btn-wrap {
    margin: 0;
    text-align: right;
  }

  @media (max-width: 1920px) {
    .btn-wrap {
      margin: 0;
    }

    .ui.input input {
      font-size: 14px;
    }
  }

  @media (max-width: 991px) {
    margin: 30px 0 60px;
  }
`;
