import styled from 'styled-components'

export default styled.div`
    
    margin-bottom: 80px;
    
    p {
        font-size: 28px;
    }
    
    & > div {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
    
    @media (max-width: 1920px) {
    
        margin-bottom: 40px;
        
        p {
            font-size: 14px;
        }
    }
`;
