import styled from 'styled-components';

export const DvTitleBig = styled.h1`
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

export const DvTitle = styled.h1`
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