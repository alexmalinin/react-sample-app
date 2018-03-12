import styled from 'styled-components';

export default styled.header`

    &.header-basic {
    
        & > div {
            min-height: 87px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        a {
            color: #666;
            font-family: 'Proxima Nova', sans-serif;
            font-size: 12px;
            font-weight: bold;
            line-height: 27px;
            text-transform: uppercase;
            letter-spacing: 3.22px;
        }
    }
    
    @media (max-width: 1920px) {
       &.header-basic {
        -webkit-box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);
        -moz-box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);
        box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);


        & > div {
            min-height: 87px;
        } 
        
        a {
            font-size: 12px;
            
            img {
                width: 60px;
            }
        }
    }
`;
