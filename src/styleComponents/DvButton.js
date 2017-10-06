import styled from 'styled-components';
import { Button } from 'semantic-ui-react'

export default styled(Button)`  
 
    &.ui.button {
        border-radius: 0;
        width: 100%;
        font-size: 24px;
        font-family: Roboto;
        text-align: center;
        color: #fff;
        
        &.verify-btn {
            padding: 40px;
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
        }
    }
    
    @media (max-width: 991px) {
        &.ui.button {
            font-size: 18px;
        }
    }
`;
