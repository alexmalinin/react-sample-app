import styled from "styled-components";

export default styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: #fff;
    font-size: 20px;
    font-family: Brix;
    position: relative;

    &:after {
      transition: all 0.4s ease;
      content: "";
      height: 2px;
      position: absolute;
      left: 0;
      bottom: -3px;
      width: 0;
    }

    &:hover {
      color: #fff;

      &:after {
        background: #fff;
        width: 100%;
      }
    }

    &.active:after {
      background: #fff;
      width: 100%;
    }

    &.proxy {
      font-family: Brix;
      text-transform: uppercase;
      font-weight: 600;

      &:last-child:after {
        content: none;
      }

      button {
        font-family: Brix;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 20px;
      }
    }
  }

  ul li {
    display: inline-block;

    & + li {
      margin-left: 20px;
    }

    &.linked-in {
      display: none;
    }
  }

  @media (max-width: 1920px) {
    a {
      font-size: 18px;

      &.proxy button {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 991px) {
    display: none !important;
  }
`;
