import styled from 'styled-components';

export default styled.div`

    font-size: 28px;
    
    & > div {
        margin-bottom: 90px;
    }
    
    .text-area-group {
        position: relative;
        
        p {
            margin: 0;
            border: 2px solid #ccc;
            border-bottom: none;
            padding: 20px;
        }
    }
    
    .flex-wrapper {
        display: flex;
        justify-content: space-between;
    }
    
    .rate {
        width: 50%;
        
        .flex-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            
            & > div {
                width: 45%;
            }
        }
    }
    
    .half-column {
        width: 50%
    }
    
    @media (max-width: 1920px) {
    
        font-size: 14px;
        
        & > div {
            margin-bottom: 60px;
        }
        
        .text-area-group {
            position: relative;
            
            p {
                border: 1px solid #ccc;
                border-bottom: none;
                padding: 15px;
            }
        }
    }
    
    @media (max-width: 991px) {
    
        .half-column,
         .rate {
            width: 75%
        }
    }
    
    @media (max-width: 767px) {
    
        .half-column,
        .rate {
            width: 100%;
        }
        
        .flex-wrapper {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }
    }
`;
