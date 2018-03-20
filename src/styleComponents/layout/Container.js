import styled from 'styled-components';

export const ContainerLarge = styled.div`
    
    margin: 0 auto;
    max-width: 1280px;
    width: 100%;


    & > .ui.grid {
       margin: 0;
    }
    
    ${props => props.indentBot ? `margin-bottom: 250px` : ``};
    /* ${props => props.indentTop ? `margin-top: 100px` : ``};
     */
    @media (min-width: 320px) {
        ${props => props.xsNoPadding ? `padding: 0` : ``};
    }
    
    @media screen and (min-width: 768px) {
        padding: 0;
    }
    
    @media screen and (max-width: 1920px) {
        max-width: 1910px;
        padding: 0;
    }
`;

export const Container = styled.div`
    
    width: 100%;
    min-height: 75vh;
    /* max-width: 1590px; */
    margin: 0 auto;
    padding: 0px 20px 80px 20px;
    margin-bottom: 50px;

    max-width: 1280px;
    margin-top: 0;
    background-color: #fff;
    box-shadow: 0px 0px 16px 0px #ccc;
    
    /* ${props => props.indentBot ? `margin-bottom: 250px` : ``}; */
    ${props => props.indentTop ? `margin-top: 100px` : ``};
    ${props => props.relative ? `position: relative` : ``};
    
    @media (max-width: 1920px) {
        max-width: 1280px;

        /* ${props => props.indentTop ? `margin-top: 80px` : ``}; */
    }
    
    @media (max-width: 991px) {
        max-width: 100%;
        /* ${props => props.indentBot ? `margin-bottom: 100px` : ``}; */
    }
    
    @media (min-width: 768px) {
        padding: 20px 20px 80px 20px;;
    }
`;
