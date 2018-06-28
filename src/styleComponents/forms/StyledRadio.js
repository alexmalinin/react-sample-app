import styled from "styled-components";

export default styled.div`
  position: relative;
  font-size: 14px;
  letter-spacing: 1.2px;
  color: #666;
  flex-basis: 33%;
  margin-bottom: 5px;

  .ui.radio.checkbox {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      z-index: 9999999999;
      width: 100%;
      height: 100%;
    }
  }

  .ownRadio,
  .ownCheckbox,
  .ownInput {
    cursor: pointer;
  }

  .ownRadio,
  .ownCheckbox {
    position: relative;
    padding-left: 20px;
  }

  .ownInput {
    opacity: 0;
    position: absolute;

    &:checked + .ownRadio,
    &:checked + .ownCheckbox {
      &::after {
        content: "";
        position: absolute;
      }
    }

    &:checked + .ownRadio {
      &::after {
        border-radius: 50%;
        width: 9px;
        height: 9px;
        background-color: #85b7d9;
        top: 3px;
        left: 3px;
        /* box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2); */
      }
    }

    &:checked + .ownCheckbox {
      &::after {
        left: 5px;
        top: 1px;
        width: 6px;
        height: 10px;
        border: solid #85b7d9;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }

  .ownRadio,
  .ownCheckbox {
    &:before {
      top: 0;
      left: 0;
      content: "";
      position: absolute;
      display: block;
      width: 15px;
      height: 15px;
      border: 1px solid #ccc;
    }
  }

  .ownRadio {
    &:before {
      border-radius: 50%;
    }
  }
`;
