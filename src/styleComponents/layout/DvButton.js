import styled from 'styled-components';
import { Button } from 'semantic-ui-react'

export const DvButton = styled(Button)`  
 
    &.ui.button {
        ${props => props.indentTop ? `margin-top: 60px` : ``};
        border-radius: 0;
        width: 100%;
        font-size: 24px;
        font-family: Roboto;
        text-align: center;
        color: #fff;
        
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
        }
    }
`;

export const NewTeamBtn = styled.div`

    max-width: 1260px;
    margin-top: 100px;
    text-align: center;
    
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
        border: 1px solid #ccc;
        border-radius: 0;
        box-shadow: none;
        position: relative;
        padding-left: 50px;
        margin-top: 50px;
        color: #000 !important; // overwrite semantic theme
        
        &:before {
            content: '';
            position: absolute;
            height: 1px;
            width: 21px;
            background: #1991fa;
            left: 10px;
            top: 50%;
        }
        
        &:after {
            content: '';
            position: absolute;
            height: 20px;
            width: 1px;
            background: #1991fa;
            left: 20px;
            top: 25%;
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
