import styled from 'styled-components'

export default styled.div`

    & > span {
        display: inline-block;
        width: 100%;
        padding: 17px;
        font-size: 28px;
        line-height: 1;
        border: 1px solid #ccc;
        border-bottom: none;
    }
    
    .Select {
        margin-bottom: 100px;
    }
    
    .Select-arrow-zone {
        display: none;
    }
    
    .Select-menu-outer {
        border-radius: none;
    }
    
    .Select-input > input {
        width: 5px;
        padding: 8px 0px;
        margin-top: 27px;
        margin-left: 15px;
    }
    
    .Select-control {
        min-height: 275px;
        border-radius: 0;
    }
    
    .Select-multi-value-wrapper {
        font-size: 14px;
        padding-bottom: 20px;
        
        .Select-value {
            display: inline-block;
            background: #fff;
            border: 2px solid #1991fa;
            padding: 8px 20px 8px 15px;
            border-radius: 25px;
            margin-left: 30px;
            margin-top: 20px;   
            
            .Select-value-icon {
                padding: 0 10px 0 0;
            }
        }
    }
    
    .Select--multi .Select-value-icon {
        border: none;
        
        &:hover {
            background: transparent;
        }
    }
    
    .is-focused:not(.is-open) > .Select-control {
        box-shadow: none;
        border-color: #ccc;
    }
    
    @media (max-width: 1920px) {
        & > span {
            font-size: 14px;
        }
        
        .Select {
            margin-bottom: 50px;
        }
        
        .Select-control {
            min-height: 200px;
        }
         
        .Select-multi-value-wrapper {
            font-size: 14px;
            padding-bottom: 15px;
            
            .Select-value {
                padding: 4px 15px 4px 10px;
                margin-left: 20px;
                margin-top: 15px;   
                
                .Select-value-icon {
                    padding: 0 5px 0 0;
                }
            }
        }
        
        .Select-input > input {
            padding: 8px 0px;
            margin-top: 16px;
            margin-left: 10px;
        }
    }
    
    @media (max-width: 767px) {
        .Select-multi-value-wrapper {
            .Select-value { 
                margin: 10px 0 0 10px;
            }
        }
        
        .Select-input > input {
            margin-top: 10px;
        }
    }
`;
