import styled, {css} from 'styled-components';

export default styled.h1`
    ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
    font-family: "Proxima Nova";
    ${props => props.fz ? `font-size: ${props.fz}px` : `font-size: 324px`};
    font-weight: 700;
    line-height: 300px;
    
    &:first-child {
        ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
        font-family: "Proxima Nova";
        ${props => props.fz ? `font-size: ${props.fz}px` : `font-size: 324px`};
        font-weight: 700;
        line-height: 300px; 
    }
`;