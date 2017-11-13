import styled from 'styled-components';

export default styled.div`
    
    max-width: 515px;
    margin: 0 auto 40px;
    
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
    
    @media (min-width: 1921px) {
        
        h3 {
            font-size: 48px;
        }
        
        p {
            font-size: 28px;
        }
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
