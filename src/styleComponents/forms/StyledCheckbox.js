import styled from "styled-components";

export default styled.div`
  display: block;
  ${props => (props.indentBot ? `margin-bottom: 90px` : ``)};

  input {
    opacity: 0;
    height: 0;
    width: 0;
  }

  input:checked + div {
    background-color: #1991fa;
    color: #fff;
    cursor: pointer;
  }

  label {
    font-family: "Brix";
    font-size: 24px;
    font-weight: 400;
    color: #000;
  }

  div {
    display: inline-block;
    border: 2px solid #1991fa;
    padding: 16px 25px;
    border-radius: 25px;
    margin: 0 30px 40px 0;
    cursor: pointer;
  }

  @media (max-width: 1920px) {
    ${props => (props.indentBot ? `margin-bottom: 40px` : ``)};

    label {
      font-size: 14px;
    }

    div {
      padding: 7px 12px;
      margin: 0px 20px 15px 0;
    }
  }

  @media (max-width: 767px) {
    label {
      font-size: 12px;
    }

    div {
      margin: 0px 5px 15px 0;
    }
  }

  @media (max-width: 414px) {
    ${props => (props.indentBot ? `margin-bottom: 20px` : ``)};

    label {
      font-size: 10px;
    }
  }
`;
