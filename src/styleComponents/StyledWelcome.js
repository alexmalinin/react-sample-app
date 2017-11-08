import styled from 'styled-components'

export default styled.div`

    .wrapper {
        width: 50%;
    }

    @media (min-width: 1921px) {
        font-size: 28px;
    }
    
    @media (max-width: 991px) {
        .wrapper {
            width: 75%;
        }
    }
    
    @media (max-width: 767px) {
        .wrapper {
            width: 100%;
        }
    }
`;
