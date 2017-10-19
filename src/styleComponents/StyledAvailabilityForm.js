import styled from 'styled-components'

export default styled.div`

    & > p {
        font-size: 28px;
        margin-bottom: 40px;
    }
    
    .Select {
        width: 50%;
    }
    
    @media (max-width: 1920px) {
         & > p {
            font-size: 16px;
            margin-bottom: 30px;
        }
    }
    
    @media (max-width: 991px) {
        .Select {
            width: 75%;
        }
    }
    
    @media (max-width: 767px) {
        .Select {
            width: 100%;
        }
    }
`;
