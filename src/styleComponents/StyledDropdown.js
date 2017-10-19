import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react'

export const DropdownAvailability = styled.div`
    font-size: 28px;
    display: block;
    width: 50%;
    margin-bottom: 60px;
    border: 2px solid #ccc; 
    
    p {
        padding: 15px 25px;
        position: relative;
        cursor: pointer;
        border-bottom: none;
        margin: 0;
        
        &:before {
            content: '';
            position: absolute;
            height: 2px;
            width: 25px;
            background: #ccc;
            transform: rotate(40deg);
            top: 50%;
            right: 34px;
        }

        &:after {
            content: '';
            position: absolute;
            height: 2px;
            width: 25px;
            background: #ccc;
            transform: rotate(-40deg);
            top: 50%;
            right: 15px;
        }
    }    
  
    .checkbox-group {
        line-height: 1.5;
        position: relative;
        padding-left: 80px;
        
        & > div {
            position relative;
            padding: 15px 0;
            
            label {
                display: block;
                cursor: pointer;
            }
        }   
         
        & > div:not(:last-child):after {
            content: '';
            position: absolute;
            height: 2px;
            width: calc(100% + 80px);
            background: #ccc;
            left: -80px;
            bottom: 0;
        } 
        
        & > div:first-child:before {
            content: '';
            position: absolute;
            height: 2px;
            width: calc(100% + 80px);
            background: #ccc;
            left: -80px;
            top: 0;
        }
    }
    
    @media (max-width: 1920px) {
    
        margin-bottom: 30px;
        font-size: 14px;
        border: 1px solid #ccc; 

        p {
            padding: 7px 15px;
            border-bottom: none;

            &:before {
                height: 1px;
                width: 15px;
                right: 27px;
            }

            &:after {
                height: 1px;
                width: 15px;
                right: 15px;
            }
        }

        .checkbox-group {
            line-height: 1.5;
            padding-left: 35px; 

            & > div {
                padding: 10px 0;
            }
            
            div:not(:last-child):after {
                height: 1px;
                width: calc(100% + 35px);
                left: -35px;
            } 
            
            div:first-child:before {
                height: 1px;
                width: calc(100% + 35px);
                left: -35px;
            }
        }
    }
    
    @media (max-width: 991px) {
        width: 75%;
    }
    
    @media (max-width: 767px) {
        width: 100%;
    }
`;

export const Days = styled(Checkbox)`
    
    padding: 0;
    
    &.ui.checkbox label:hover {
        color: #000;
    }
    
    &.ui.checkbox label {
        padding: 0;
    }
    
    &.ui.checkbox .box:hover::before, 
    &.ui.checkbox label:hover::before {
        border-color: #000;
    }
    
    &.ui.checkbox input:checked~.box:before, 
    &.ui.checkbox input:checked~label:before {
        border-color: #000;
    }
    
    &.ui.checkbox input:checked:focus~.box:before, 
    &.ui.checkbox input:checked:focus~label:before, 
    &.ui.checkbox input:not([type=radio]):indeterminate:focus~.box:before, 
    &.ui.checkbox input:not([type=radio]):indeterminate:focus~label:before {
        border-color: #000;
    }
    
    &.ui.checkbox label:before {
        width: 15px;
        height: 15px;
        border: 1px solid #000;
        border-radius: 50%;
        left: -20px;
    }
    
    &.ui.checkbox input:checked~.box:after,
    &.ui.checkbox input:checked~label:after {
        font-size: 0;
        position: absolute;
        border-radius: 50%;
        width: 9px;
        height: 9px;
        background-color: #1991fa;
        top: 3px;
        left: -17px;
    }
    
    @media (min-width: 1921px) {
        
        
        &.ui.checkbox { 
            font-size: 28px;
        }
        
        &.ui.checkbox label:before {
            height: 30px;
            width: 30px;
            top: -7px;
            left: -55px;
        }
        
        &.ui.checkbox input:checked~.box:after,
        &.ui.checkbox input:checked~label:after {
            width: 20px;
            height: 20px;
            top: -2px;
            left: -55px;
        }
    }
`;
