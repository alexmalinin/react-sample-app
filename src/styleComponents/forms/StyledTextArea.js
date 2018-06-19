import styled from "styled-components";
import { colors, primaryColors, boxShadow } from "../constants/colors";

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
    ${props => props.disabled && "pointer-events: none"};

    &:disabled {
      background-color: transparent;
    }
  }

  @media (max-width: 1920px) {
    textarea {
      border: 2px solid #f2f2f2;
      min-height: 160px;
      margin-bottom: 0;
    }
  }

  &.area {
    position: relative;
    p,
    .textarea-label {
      margin-top: 20px;
    }

    .ui.error.input {
      span {
        right: 20px;
      }
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

  &.transparent {
    textarea {
      padding: 6px;
      margin-bottom: 15px;
      overflow: hidden;
      resize: none;
      min-height: auto;
      letter-spacing: normal;
      color: ${primaryColors.accentGrey};
      font-weight: 400;
      font-size: 15px;
      font-family: "Brix";
      line-height: 2em;
      border: 1px solid var(--bdcolor, transparent);
      border-radius: 5px;
      cursor: pointer;

      &::placeholder {
        color: ${primaryColors.lightGrey};
      }

      &.editing {
        --bdcolor: #ccc;
        margin-bottom: 7px;
      }

      &.error {
        --bdcolor: red;
        --inputbdcolor: red;
      }

      &:focus,
      &.editing:focus {
        border-color: ${colors.darkBlue};
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
        cursor: text;
      }
    }
  }

  .controls {
    margin-bottom: 14px;
    .ui.button {
      padding: 4px 14px 6px 14px;
      color: var(--butcolor, #666);
      line-height: normal;
      font-weight: 600;
      background: var(--butbgcolor, transparent);
      border: 1px solid var(--butbdcolor, #ccc);
      border-radius: 4px;
      transition: 0.3s;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
      }

      &.save {
        --butbdcolor: ${primaryColors.green};
        --butcolor: #fff;
        --butbgcolor: ${primaryColors.green};
        margin-right: 14px;
      }

      &.cancel {
        --butbdcolor: transparent;
        --butcolor: ${primaryColors.grey};

        &:hover {
          --butbdcolor: ${primaryColors.lightGrey};
        }
      }
    }
  }
`;

export const StyledLabelArea = styled.label`
  position: relative;

  span {
    top: -40px;
  }
`;
