import styled from 'styled-components';

export const DropdownAvailability = styled.div`

    font-size: 28px;
    display: block;
    width: 50%;
    margin-bottom: 60px;
    
    & > p {
        padding: 15px;
        border: 2px solid #ccc; 
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
    
    & > div {
        padding-left: 70px;
        border: 2px solid #ccc;
        border-bottom: none;
    }
    
    .checkbox-group {
        line-height: 1.5;
        position: relative;
        
        div {
            position relative;
            padding: 15px 0;
            
            &:after {
                content: '';
                position: absolute;
                height: 2px;
                width: calc(100% + 70px);
                background: #ccc;
                left: -70px;
                bottom: 0;
            }
            
            label {
                display: block;
                cursor: pointer;
            }
        }    
    }
    
    @media (max-width: 1920px) {
        margin-bottom: 30px;
        font-size: 14px; 
       
        & > p {
            padding: 7px 15px;
            border: 1px solid #ccc; 
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
        
        & > div {
            padding-left: 20px;
            border: 1px solid #ccc;
            border-bottom: none;
        }
        
        .checkbox-group {
            line-height: 1.5;
            
            div {
                padding: 10px 0;
                
                &:after {
                    height: 1px;
                    width: calc(100% + 20px);
                    left: -20px;
                    bottom: 0;
                }
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
