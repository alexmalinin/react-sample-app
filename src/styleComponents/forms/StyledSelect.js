import styled, { css } from 'styled-components';
import Select from 'react-select';

export default styled(Select)`

    .Select-control:focus {
        border-bottom: 5px solid red;
    }

    .Select-arrow {
        border-style: none;
        border-width: 0;
        transition: .4s;
        height: 100%;
        width: 10px;
    }


    &.is-focused:not(.is-open) .Select-control {
        border: none;
    }

    &.has-value .Select-value-label {
        color: #666 !important;
    }

    .Select-arrow::before,
    .Select-arrow::after {
        content: '';
        width: 12px;
        height: 2px;
        position: absolute;
        top: 50%;
        right: 0;
        background: #ccc;
        transform: rotate(45deg);
        transform-origin: 0;
    }

    &.is-open .Select-arrow{
        transform: rotate(-90deg);
    }

    .Select-arrow::before {
        transform: rotate(-45deg);
    }

    & .Select-control {
        border-radius: 0;
        border: none;
        border-bottom: 2px solid #f2f2f2;
    }

    ${props => props.error && css`
        & .Select-control {
            border-color: #e0b4b4;
            background-color: #fff6f6;
        }  
          
        & .Select-placeholder{
            color: #e7bdbc;
        }
    `}

`;