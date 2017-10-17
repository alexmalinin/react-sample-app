import styled from 'styled-components';

export const ContainerLarge = styled.div`

    margin: 0 auto;
    padding: 0 15px;

    & > .ui.grid {
       margin: 0;
    }
    
    ${props => props.indentBot ? `margin-bottom: 250px` : ``};
    ${props => props.indentTop ? `margin-top: 100px` : ``};
    
    @media (min-width: 320px) {
        ${props => props.xsNoPadding ? `padding: 0` : ``};
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

    max-width: 1590px;
    margin: 0 auto;
    padding: 0 15px;
    
    ${props => props.indentBot ? `margin-bottom: 250px` : ``};
    ${props => props.indentTop ? `margin-top: 100px` : ``};
    
    @media (max-width: 1920px) {
        max-width: 1230px;
        ${props => props.indentTop ? `margin-top: 80px` : ``};
    }
    
    @media (max-width: 991px) {
        max-width: 100%;
        ${props => props.indentBot ? `margin-bottom: 100px` : ``};
    }
    
    @media (min-width: 768px) {
        padding: 0 20px;
    }
`;
