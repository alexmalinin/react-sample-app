import styled, { css } from 'styled-components';

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

    font-family: 'Roboto';
    font-weight: 300;    
    
    ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
    ${props => props.fz ? `font-size: ${props.fz}px` : `font-size: 84px`};
    
    &:first-child {
        font-family: 'Roboto';
        font-weight: 300;
        
        ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
        ${props => props.fz ? `font-size: ${props.fz}px` : `font-size: 84px`};
    }
    
    @media(max-width: 1920px) {
    
       &:first-child {
          margin-top: 30px;
          font-size: 60px;
       } 
    }
    
    @media(max-width: 991px) {
    
       &:first-child {
          font-size: 50px;
       } 
    }
`;

export const DvTitleSmall = styled.h2`
     
    font-size: 48px;
    font-weight: 400;
    margin-bottom: 90px;
    font-weight: 300;  
    
    ${props => props.fz ? `font-size: ${props.fz}px` : ``};
    ${props => props.negative ? `margin-left: -15px` : ''};
    
    
    @media (max-width: 1920px) {
        margin-bottom: 40px;
    }
    
    @media (max-width: 1099px) {
        ${props => props.xsCenter ? css`
            text-align: center;
            margin-left: 0;
            margin-bottom: 30px;
            ` : ''};
    }
`;