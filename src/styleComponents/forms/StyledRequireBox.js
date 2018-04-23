import styled, {css} from 'styled-components';
import { primaryColors } from '../constants/colors';

export default styled.div`
    display: flex;
    margin-bottom: 80px;
    position: relative;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1;

    & > div {

      & input {
        outline:none;
        border: none;
      }
    }

    & div.ui.checkbox > label:before {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border-color: ${primaryColors.darkGrey};
    }

    & div.ui.checkbox input:checked:focus~label:before {
      border-color: ${primaryColors.darkGrey};
    }

    & div.ui.checked.checkbox > label:after {
      content: '';
      width: 12px;
      height: 12px;
      top: 3px;
      left: 3px;
      border-radius: 50%;
      padding: 4px;
      background-color: ${primaryColors.darkGrey};
    }

    & div.ui.checkbox input:checked:focus~label:after {
      border-color: ${primaryColors.darkGrey};
    }

    b {
      cursor: pointer;
    }

    & > span {
        margin-left: 15px;
        color: ${primaryColors.lightGrey};
    }

    @media (min-width: 1921px) {

        & > span {
            margin-left: 25px;
        }

        .ui.checkbox label {
            &:before {
                width: 28px;
                height: 28px;
            }

            &:after {
                font-size: 23px;
                top: 5px;
                left: 3px;
            }
        }
    }

    @media (max-width: 1920px) {
        margin: 30px 0;
        font-size: 14px;
    }

    @media (max-width: 1920px) {
      & > span {
        margin-right: 100px;
      }
    }

`;
