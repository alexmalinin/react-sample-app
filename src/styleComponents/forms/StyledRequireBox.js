import styled, {css} from 'styled-components';

export default styled.div`
    display: flex;
    margin-bottom: 80px;
    position: relative;
    font-size: 24px;
    font-weight: 300;
    line-height: 1;
    
    & > span {
        margin-left: 15px;
    }
    
    
    @media (min-width: 1921px) {
        
        & > span {
            margin-left: 25px;
        }
            
        .ui.checkbox label {
            &:before {
                width: 28px;
                height: 28px;
            }
            
            &:after {
                font-size: 23px;
                top: 5px;
                left: 3px;
            }
        }     
    }
    
    @media (max-width: 1920px) {
    
        margin-bottom: 30px;
        font-size: 14px;
    }
    
`;