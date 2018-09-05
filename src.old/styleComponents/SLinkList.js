import styled, { css } from "styled-components";

const renderFooter = `
    float: right;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-height: 200px;
    width: 320px;
  
    li {
        margin-bottom: 15px;
        
        &:nth-child(3) {
            margin-right: 90px;
            margin-bottom: 30px;
        }
    }
  
    a {
        font-size: 20px;
        color: #fff;
        position: relative;
            
        &:after {
            transition: all .4s ease;
            content: '';
            height: 2px;
            position: absolute;
            left: 0;
            bottom: -3px;
            width: 0;
        }
        
        &:hover {
            color: #fff;
           
            &:after {
                background: #fff;
                width: 100%;
            }
        }
    } 
  
    @media (max-width: 1920px) {
    
        width: 225px;
        
        li {
            &:nth-child(3) {
            margin-right: 35px;
            margin-bottom: 20px;
            }  
        }
        
        a {
            font-size: 16px
        }
    }
  
    @media (max-width: 767px) {
        width: 100%;
        max-height: none;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;
        
        li {
            
            &:nth-child(3) {
                margin-right: 0;
                margin-bottom: 15px;
                }  
            }
        }
        
    @media (max-width: 567px) {
        flex-direction: column;
        align-items: flex-end;
    }
`;

export default styled.ul`
  ${props =>
    props.footer &&
    css`
      ${renderFooter};
    `};
`;
