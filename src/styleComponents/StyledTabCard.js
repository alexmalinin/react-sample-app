import styled from "styled-components";
import { Tab } from "semantic-ui-react";

export const RenderWorkCard = styled.div`
  border: 2px solid #808080;
  ${props =>
    props.border
      ? `border-top: 10px solid ${props.border}`
      : `border-top: 10px solid #1991fa`};
  max-width: 1240px;
  margin: 0 auto 45px;
  line-height: 1;

  .header-card,
  .content-card,
  .action-card {
    padding: 50px 80px;
  }

  .header-card {
    h2 {
      font-size: 48px;
      margin-bottom: 25px;
    }

    span {
      display: inline-block;
      font-size: 36px;
      margin-bottom: 50px;
    }

    p {
      display: flex;
      align-items: center;
      font-size: 28px;

      img {
        margin-right: 15px;
      }
    }
  }

  .content-card {
    font-size: 28px;
    border-top: 2px solid #808080;

    h4 {
      font-size: 28px;
      margin-bottom: 40px;
    }
  }

  .action-card {
    font-size: 28px;

    a {
      padding-left: 60px;
      position: relative;
      cursor: pointer;

      &:before {
        content: "";
        position: absolute;
        width: 34px;
        height: 2px;
        background: #1991fa;
        left: 0;
        top: calc(50% - 1px);
      }

      &:after {
        content: "";
        position: absolute;
        width: 2px;
        height: 33px;
        background: #1991fa;
        left: 16px;
        top: 0;
        transition: all 0.5s ease-in-out;
      }

      &.active:after {
        transform: rotate(90deg);
        background: transparent;
      }
    }
  }

  @media (max-width: 1920px) {
    border: 1px solid #808080;
    ${props =>
      props.border
        ? `border-top: 7px solid ${props.border}`
        : `border-top: 7px solid #1991fa`};
    max-width: 700px;

    .header-card,
    .content-card,
    .action-card {
      padding: 30px 40px;
    }

    .header-card {
      h2 {
        font-size: 34px;
        margin-bottom: 25px;
      }

      span {
        font-size: 22px;
        margin-bottom: 30px;
      }

      p {
        font-size: 18px;

        img {
          max-width: 32px;
        }
      }
    }

    .content-card {
      font-size: 18px;
      border-top: 1px solid #808080;

      h4 {
        font-size: 18px;
        margin-bottom: 30px;
      }
    }

    .action-card {
      font-size: 18px;

      a {
        padding-left: 30px;

        &:before {
          width: 19px;
          height: 1px;
          left: 0;
          top: 50%;
        }

        &:after {
          width: 1px;
          height: 18px;
          left: 9px;
          top: 2px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    border: 1px solid #808080;
    ${props =>
      props.border
        ? `border-top: 7px solid ${props.border}`
        : `border-top: 7px solid #1991fa`};
    max-width: 700px;

    .header-card,
    .content-card,
    .action-card {
      padding: 20px 15px;
    }

    .header-card {
      h2 {
        font-size: 22px;
        margin-bottom: 15px;
      }

      span {
        font-size: 16px;
        margin-bottom: 20px;
      }

      p {
        font-size: 14px;

        img {
          max-width: 22px;
        }
      }
    }

    .content-card {
      font-size: 14px;

      h4 {
        font-size: 14px;
        margin-bottom: 20px;
      }
    }

    .action-card {
      font-size: 14px;

      a {
        padding-left: 30px;

        &:before {
          width: 15px;
          height: 1px;
          left: 0;
          top: 50%;
        }

        &:after {
          width: 1px;
          height: 13px;
          left: 7px;
          top: 2px;
        }
      }
    }
  }
`;

export const StyledTabs = styled(Tab)`
  margin-bottom: 180px;

  .ui.text.menu {
    justify-content: center;
    font-size: 36px;

    .item {
      position: relative;

      &.active {
        color: #1991fa;

        &:after {
          content: "";
          position: absolute;
          height: 2px;
          width: 100%;
          background: #1991fa;
          bottom: 2px;
          left: 0;
        }
      }
    }
  }

  .ui.segment {
    border: none;
    box-shadow: none;
  }

  @media (max-width: 1920px) {
    .ui.text.menu {
      font-size: 28px;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 60px;

    .ui.text.menu {
      font-size: 22px;
    }
  }
`;
