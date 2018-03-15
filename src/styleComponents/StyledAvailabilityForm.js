import styled from 'styled-components'

export default styled.div`

    .checkbox-group {
        display: flex;
        justify-content: space-around;
    }

    & > p {
        margin-bottom: 10px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        color: #666;
        padding-left: 10px;
    }
    
    /* .Select {
        width: 50%;
    } */
    
    @media (max-width: 1920px) {
         /* & > p {
            font-size: 16px;
            margin-bottom: 30px;
        } */
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
