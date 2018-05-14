import styled, { css } from "styled-components";

export default styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 20px;
  border: none;
  border-bottom: 2px solid #f2f2f2;

  .phone-wrapper {
    margin: 0;
    display: flex;
    width: 100%;

    .Select-placeholder {
      color: #959595;
    }

    .Select-arrow-zone {
      display: none;
    }

    .Select-value-label {
      color: #666 !important;
      letter-spacing: 1.5px !important;
      font-size: 16px !important;
    }

    .Select-control .Select-value {
      padding-left: 7px !important;
    }

    div:first-child {
      flex: 0 0 20%;
      margin-bottom: 0;
      margin-right: 2px;
      border-radius: 0;
      border: none;
    }

    div:last-child {
      margin-bottom: 0;
      flex: 0 0 75%;

      input {
        border-radius: 0;
        border: none;
        padding-right: 10px;
      }
    }
  }

  & > span {
    flex: 0 0 20%;
    position: absolute;
    top: 0;
    left: 8px;
    text-align: center;
    z-index: 2;
    text-transform: uppercase;
    color: #666;
    font-weight: 600;
    font-size: 12px;
  }

  .phone-code__label {
    &:after {
      content: "*";
      margin-left: 5px;
      color: red;
    }
  }

  @media (min-width: 1921px) {
    border: 2px solid #ccc;
    margin-bottom: 80px;

    & > span {
      font-size: 28px;
    }
  }

  @media (max-width: 1920px) {
    margin-bottom: 30px;
  }

  @media (max-width: 1499px) {
    .phone-wrapper {
      div:first-child {
        flex: 0 0 35%;
      }

      div:last-child {
        flex: 0 0 65%;
      }
    }
  }

  @media (max-width: 1024px) {
    .phone-wrapper {
      div:first-child {
        flex: 0 0 39%;
      }

      div:last-child {
        flex: 0 0 61%;
      }
    }
  }

  @media (max-width: 767px) {
    .phone-wrapper {
      div:first-child {
        flex: 0 0 35%;
      }

      div:last-child {
        flex: 0 0 65%;
      }
    }
  }

  @media (max-width: 399x) {
    .phone-wrapper {
      div:first-child {
        flex: 0 0 39%;
      }

      div:last-child {
        flex: 0 0 61%;
      }
    }
  }
`;
