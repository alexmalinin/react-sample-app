import styled from 'styled-components';

export default styled.div`
    
    
    margin-bottom: 40px;
    
    h3 {
        display: block;
        font-weight: 300;
        font-size: 30px;
        margin-bottom: 20px;
        text-align: center;
    }
    
    p {
        font-size: 18px;
        font-weight: 400;
        text-align: center;
    }
    
    @media (max-width: 1920px) {
    
        font-size: 14px;
    }
    
    @media (max-width: 414px) {
    
        br {
            display: none;
        }
    }
`;
