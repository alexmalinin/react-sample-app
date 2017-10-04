import styled, {css} from 'styled-components';

export default styled.div`
    display: flex;
    margin-bottom: 70px;
    position: relative;
    
    & > span {
        margin-left: 15px;
    }
    
    @media (max-width: 1920px) {
       margin-bottom: 30px; 
    }
    
`;