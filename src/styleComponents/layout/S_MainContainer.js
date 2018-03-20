import styled from 'styled-components';

export const S_MainContainer = styled.div`

    max-width: 1920px;
    margin: 0 auto;
    padding-top: 87px;
    display: flex;
    justify-content: center;
    
    ${props => props.indentBot ? `margin-bottom: 250px` : ``};
    ${props => props.indentTop ? `margin-top: 100px` : ``};
    ${props => props.relative ? `position: relative` : ``};
    
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
