import styled from "styled-components";

export default styled.div`
  &.moduleNumber {
    margin-left: 28px;

    a {
      color: #666;
      &:hover {
        color: #666;
      }
    }
  }

  &.moduleBreadcrumb {
    a {
      margin-left: 40px;
    }

    &:first-of-type {
      &:hover {
        opacity: 0.7;
      }
    }
  }

  a {
    position: relative;
    text-transform: uppercase;
    font-weight: bold;
    padding-right: 30px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      right: 10px;
      top: calc(50% - 1px);

      width: 12px;
      height: 2px;
      transform: rotate(-45deg);
      transform-origin: 0% 50%;

      background-color: #d0d0d0;
    }

    &::after {
      transform: rotate(45deg);
    }
  }
`;
