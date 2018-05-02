import styled from "styled-components";

export default styled.header`
  &.header-intro {
    height: 199px;

    .inside-header {
      position: fixed;
      width: 100%;
      z-index: 11;
    }

    .top-header {
      padding-top: 27px;
      height: 100px;
      background-color: #fff;

      & > div {
        display: flex;
        justify-content: space-between;
      }
    }

    .bot-header {
      height: 98px;
      background-color: #a600ea;

      & > div {
        height: 100%;
      }
    }
  }

  &.header-basic {
    height: 173px;

    .top-header {
      display: inline-block;
    }

    .bot-header {
      display: inline-block;
    }
  }

  @media (max-width: 1920px) {
    &.header-intro {
      height: 150px;

      .top-header {
        height: 50px;
        padding-top: 10px;
      }

      .bot-header {
        height: 65px;
      }
    }
  }

  @media (max-width: 991px) {
    &.header-intro {
      height: 150px;

      .top-header {
        height: 50px;
        padding-top: 10px;
      }

      .bot-header {
        height: 22px;
      }
    }
  }
`;
