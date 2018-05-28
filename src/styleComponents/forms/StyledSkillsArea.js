import styled from "styled-components";

export default styled.div`
  & > span {
    display: inline-block;
    width: 100%;
    padding-left: 10px;
    font-size: 12px;
    line-height: 1;
    border-bottom: none;
    text-transform: uppercase;
    font-weight: bold;
    color: #666;
  }

  .Select {
    margin-bottom: 100px;
  }

  .Select-arrow-zone {
    display: none;
  }

  .Select-menu-outer {
    border-radius: none;
    position: absolute;
    top: 42px;

    .Select-menu {
      max-height: 140px;
    }
  }

  .Select-input > input {
    width: 5px;
    padding: 8px 0px;
    margin-top: 27px;
    margin-left: 15px;
  }

  .Select-input {
    margin: 0;
    padding: 0;
  }

  .Select-input > input {
    font-size: 16px;
    letter-spacing: 1.5px;
    color: #666;
    position: absolute;
    top: -15px;
    left: 0;
  }

  .Select-control {
    border-radius: 0;
    border: none;

    &:hover {
      box-shadow: none;
    }

    &::before {
      content: "Start type your skill here...";
      position: absolute;
      top: 16px;
      left: 10px;
      width: 100%;
      height: 30px;
      cursor: text;
      color: #bbb;
      font-weight: 400;
    }
  }

  .Select-placeholder {
    color: #666;
    font-family: "Brix";
    font-weight: 400;
    cursor: text;
  }

  .is-focused {
    .Select-control {
      &::before {
        content: "";
      }
    }
    .Select-multi-value-wrapper {
      border-top-color: #ccc;
    }
  }

  .Select-multi-value-wrapper {
    font-size: 14px;
    padding-bottom: 20px;
    margin-top: 40px;
    width: 100%;
    border-top: 2px solid #f2f2f2;

    .Select-value {
      position: relative;
      display: inline-block;
      color: #666;
      font-size: 14px;
      letter-spacing: 1.2px;
      background: #fff;
      border: 1px solid #ccc;
      padding: 0 25px 0 5px;
      border-radius: 25px;
      margin-left: 30px;
      margin-top: 20px;

      .Select-value-icon {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 10px 0 0;
        color: #ccc;
      }

      .Select-value-icon:hover {
        color: #666;
      }
    }
  }

  .Select--multi .Select-value-icon {
    border: none;

    &:hover {
      background: transparent;
    }
  }

  .is-focused:not(.is-open) > .Select-control {
    box-shadow: none;
    border-color: #1991fa;
  }

  .skillsField {
    display: flex;
    flex-wrap: wrap;
  }

  .Select-value.Select-create-option-placeholder .skillItem {
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 3px 7px;
    color: #666;
    border: 1px solid #666;
    border-radius: 25px;
  }

  @media (max-width: 1920px) {
    & > span {
      font-size: 12px;
    }

    .Select {
      margin-bottom: 20px;
    }

    .Select-control {
      min-height: 20px;
    }

    .Select-multi-value-wrapper {
      font-size: 14px;
      padding-bottom: 15px;

      .Select-value {
        /* padding: 4px 15px 4px 10px; */
        margin: 10px 8px 0 3px;

        .Select-value-icon {
          padding: 0 5px 0 0;
        }
      }
    }

    .Select-input > input {
      padding: 8px 0px;
      margin-top: 16px;
      margin-left: 10px;
    }
  }

  @media (max-width: 767px) {
    .Select-multi-value-wrapper {
      .Select-value {
        margin: 10px 0 0 10px;
      }
    }

    .Select-input > input {
      margin-top: 10px;
    }
  }
`;
