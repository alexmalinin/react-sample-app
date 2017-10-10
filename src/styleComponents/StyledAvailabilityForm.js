import styled from 'styled-components'

export default styled.div`
    
    & > p {
        font-size: 28px;
        margin-bottom: 40px;
    }
    
    @media (max-width: 1920px) {
         & > p {
            font-size: 16px;
            margin-bottom: 30px;
        }
    }
`;