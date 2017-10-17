import styled from 'styled-components';

export default styled.header`

    &.header-basic {
    
        & > div {
            min-height: 140px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        a {
            color: #1991fa;
            font-family: 'Proxima Nova', sans-serif;
            font-size: 24px;
            font-weight: 600;
            text-decoration: underline;
            text-transform: uppercase;
        }
    }
    
    @media (max-width: 1920px) {
       &.header-basic {
    
        & > div {
            min-height: 90px;
        } 
        
        a {
            font-size: 20px;
            
            img {
                width: 60px;
            }
        }
    }
`;
