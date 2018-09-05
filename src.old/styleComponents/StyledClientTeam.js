import styled from "styled-components";

export default styled.div`
  width: 100%;

  .gag {
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.85);
    color: #3192f6;

    h4 {
      text-align: center;
      font-size: 30px;
    }
  }

  .flex-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & > div {
      max-width: 375px;
      margin: 0 0 30px 0;
    }
  }

  @media (min-width: 1921px) {
    .flex-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      & > div {
        max-width: 500px;
        margin: 40px 0 0 0;
      }
    }

    .gag h4 {
      font-size: 48px;
    }
  }

  @media (max-width: 1200px) {
    .flex-wrapper {
      justify-content: center;

      & > div {
        margin: 40px 15px 0 15px;
      }
    }
  }
`;
