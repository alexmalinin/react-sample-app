import styled, {css} from 'styled-components';

export default styled.h1`
    ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
    font-family: "Roboto";
    ${props => props.fz ? `font-size: ${props.fz}px` : `font-size: 84px`};
    font-weight: 300;
    
    &:first-child {
        ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
        font-family: "Roboto";
        ${props => props.fz ? `font-size: ${props.fz}px` : `font-size: 84px`};
        font-weight: 300;
    }
`;
