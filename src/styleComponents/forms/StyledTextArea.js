import styled from "styled-components";

export const StyledTextArea = styled.div`
  ${props => (props.padded ? `padding: 0 20px` : ``)};

  p,
  .textarea-label {
    font-size: 12px;
    text-transform: uppercase;
    color: #666;
    font-weight: 600;
    word-spacing: 1.5px;
    padding-left: 7px;
  }

  textarea {
    border: 2px solid #f2f2f2;
    width: 100%;
    min-height: 360px;
    font-size: 16px;
    letter-spacing: 1.5px;
    color: #666;
    resize: vertical;
    padding: 15px;
    outline: none;
    margin-bottom: 0;
  }

  @media (max-width: 1920px) {
    textarea {
      border: 2px solid #f2f2f2;
      min-height: 160px;
      margin-bottom: 0;
    }
  }

  &.area {
    p,
    .textarea-label {
      margin-top: 20px;
    }

    textarea {
      padding: 8px;
      margin-bottom: 15px;
      border: none;
      min-height: 72px;
      height: ${props => (props.large ? `108px` : `72px`)};
      overflow: hidden;
      line-height: 36px;
      resize: none;
      background-image: -moz-linear-gradient(
        top,
        transparent,
        transparent 34px,
        #f2f2f2 2px
      );
      background-image: -webkit-linear-gradient(
        top,
        transparent,
        transparent 34px,
        #f2f2f2 2px
      );

      -webkit-background-size: 100% 50px;
      background-size: 100% 36px;
    }
  }
`;

export const StyledLabelArea = styled.label`
  position: relative;

  span {
    top: -40px;
  }
`;
