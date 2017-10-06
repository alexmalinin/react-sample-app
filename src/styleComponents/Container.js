import styled from 'styled-components';

export const ContainerLarge = styled.div`

    margin: 0 auto;

    @media (min-width: 320px) {
        padding: 0 15px;
    }
    
    @media screen and (min-width: 768px) {
        padding: 0 30px;
    }
    
    @media screen and (min-width: 1921px) {
        max-width: 1910px;
        padding: 0 15px;
    }
`;


export const Container = styled.div`
    margin: 0 auto;
    max-width: 1230px;
    padding: 0 15px;
    
    ${props => props.indentBot ? `margin-bottom: 250px` : ``};
    
    @media (max-width: 991px) {
        ${props => props.indentBot ? `margin-bottom: 100px` : ``};
    }
    
    @media screen and (min-width: 768px) {
        padding: 0 20px;
    }
    
    @media screen and (min-width: 1921px) {
        max-width: 1590px;
        padding: 0 15px;
    }
`;