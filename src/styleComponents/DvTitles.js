import styled from 'styled-components';

export const DvTitleBig = styled.h1`
    ${props => props.flex ? `display:flex; justify-content: center`: ``};
    
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
    
    @media (max-width: 1920px) {
        &:first-child {
            margin-top: 0;
        }
    }
    
    @media (max-width: 1499px) {
        &:first-child {
            font-size: 200px;
            line-height: 200px;
        }
    }
    
    @media (max-width: 1499px) {
        &:first-child {
            font-size: 150px;
            line-height: 150px;
        }
    }
    
    @media (max-width: 767px) {
        justify-content: flex-start;
        max-width: 560px;
        margin: 0 auto;
        
        &:first-child {
            font-size: 140px;
            line-height: 140px;
        }
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
