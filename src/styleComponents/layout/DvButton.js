import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const DvButton = styled(Button)`  
 
    &.ui.button {
        
        ${props => props.indentTop ? `margin-top: 60px` : ``};
        width: ${props => props.smallBtn ? `50%` : `100%` };
        border-radius: ${props => props.smallBtn ? `5px` : `0` };
        margin-left: ${props => props.smallBtn ? `25%` : `0` };
        font-size: ${props => props.smallBtn ? `18px` : `24px` };
        font-family: 'Brix';
        text-align: center;
    
        &.verify-btn {
            padding: 40px;
        }
    
        &.width200 {
            width: 200%;
        }
    }
    
    @media (max-width: 1920px) {
        &.ui.button {
            &.verify-btn {
                padding: 15px;
                margin-bottom: 45px;
            }
        }
    }
    
    @media (max-width: 991px) {
        &.ui.button {
            &.verify-btn {
                font-size: 18px;
            }
            
            &.width200 {
                width: 100%;
            }
        }
    }
    
    @media (max-width: 767px) {
        &.ui.button {
            font-size: 18px;
             ${props => props.xsIndent ? `margin-bottom: 30px` : ``};
        }
    }
`;

export const NewTeamBtn = styled.div`

    max-width: 1260px;
    margin-top: 100px;
    text-align: center;
    font-family: 'Brix';
    
    a {
        display: inline-block;
        width: 120px;
        height: 120px;
        background: #fff;
        outline: none;
        border: 2px solid #808080;
        position: relative;
        margin-bottom: 50px;
        
        &:before {
            content: '';
            position: absolute;
            height: 97px;
            width: 2px;
            background: #808080;
            top: 9px;
            transition: all .2s ease-in-out
        }
        
        &:after {
            content: '';
            position: absolute;
            width: 97px;
            height: 2px;
            background: #808080;
            left: 9px;
            top: 49%;
            transition: all .2s ease-in-out
        }
        
        &:active {
            &:before {
                content: '';
                position: absolute;
                height: 55px;
                width: 2px;
                background: #808080;
                top: 31px;
            }
        
            &:after {
                content: '';
                position: absolute;
                width: 55px;
                height: 2px;
                background: #808080;
                left: 31px;
            }
        }
    }
    
    span {
        display: block;
        font-size: 28px;
        font-weight: bold;
        color: #000;
    }
    
    @media (max-width: 1920px) {
    
        max-width: 1275px;
        margin-top: 50px;
        
        a {
            width: 80px;
            height: 80px;
            border: 1px solid #808080;
            margin-bottom: 30px;
            
            &:before {
                height: 60px;
                width: 1px;
                top: 9px;
            }
            
            &:after {
                width: 60px;
                height: 1px;
                left: 9px;
            }
            
            &:active {
                &:before {
                    content: '';
                    height: 35px;
                    width: 1px;
                    top: 22px;
                }
            
                &:after {
                    width: 35px;
                    height: 1px;
                    left: 22px;
                }
            }
        }
        
        span {
            display: block;
            font-size: 18px;
            font-weight: bold;
            color: #000;
        }   
    }
`;

export const AddNewBtn = styled(Button)`

    &.ui.basic.button {
        border: 2px solid #f2f2f2;
        width: 100%;
        border-radius: 0;
        box-shadow: none;
        position: relative;
        padding-left: 50px;
        margin-top: 20px;
        font-family: 'Brix';
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        z-index: 5;
        color: #666 !important; // overwrite semantic theme
        
        &:before {
            content: '';
            position: absolute;
            height: 2px;
            width: 21px;
            background: #1991fa;
            left: 11px;
            top: 48%;
        }
        
        &:after {
            content: '';
            position: absolute;
            height: 21px;
            width: 2px;
            background: #1991fa;
            left: 20px;
            top: 16%;
        }
    }
    
    @media (min-width: 1921px) {
        &.ui.basic.button {
            border: 2px solid #ccc;
            padding-left: 100px;
            font-size: 28px;
            
            &:before {
                content: '';
                position: absolute;
                height: 2px;
                width: 36px;
                background: #1991fa;
                left: 20px;
                top: 50%;
            }
            
            &:after {
                content: '';
                position: absolute;
                height: 36px;
                width: 2px;
                background: #1991fa;
                left: 37px;
                top: 25%;
            }
        }
    }
`;


export const SaveBtn = styled(Button)`

    &.ui.primary.button {
        border-radius: 50%;
        min-width: 60px;
        height: 60px;
        background-color: #fff;
        color: #ccc;
        border: 1px solid #ccc; 
        position: absolute;
        bottom: -26px;
        right: 20px;
        font-family: 'Brix';
        text-align: center;
        color: #fff;
        z-index: 5;
        
        span {
            min-width: 90px;
            text-transform: uppercase;
            font-size: 12px;
            position: absolute;
            color: #ccc;
            bottom: -22px;
            right: -16px;
            font-weight: 0;
        }

        &::before,
        &::after {
            content: '';
            position: absolute; 
            height: 1px;
            background-color: #ccc;
        }

        &::before {
            width: ${props => props.updateBtn ? `10px` : `15px` };
            top: ${props => props.updateBtn ? `33px` : `24px` };
            left: ${props => props.updateBtn ? `20px` : `22px` };
            transform: rotate(45deg);
        }

        &::after {
            width: ${props => props.updateBtn ? `20px` : `15px` };
            top: ${props => props.updateBtn ? `30px` : `34px` };
            left: ${props => props.updateBtn ? `25px` : `22px` };
            transform: rotate(-45deg);
        }

        /* &.verify-btn {
            padding: 40px;
        }
        
        &.width200 {
          width: 200%;
        } */
    }

    &.ui.primary.button:hover,
    &.ui.primary.button:focus {
        color: #666;
        border: 1px solid #666;
        background-color: #fff !important;

        span {
            color: #666;
        }
        &::before, 
        &::after {
            background-color: #666;
        }
    }
`