import styled from 'styled-components';

export const S_Board = styled.div`

    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    
    & > div {
      flex-grow: 1;
      background-color: #ccc;
    }
    
    h3 {
      text-align: center;
    }
        
    {/*@media (max-width: 1920px) {
        max-width: 1230px;
        ${props => props.indentTop ? `margin-top: 80px` : ``};
    }
    
    @media (max-width: 991px) {
        max-width: 100%;
        ${props => props.indentBot ? `margin-bottom: 100px` : ``};
    }
    
    @media (min-width: 768px) {
        padding: 0 20px;
    }*/}
`;
