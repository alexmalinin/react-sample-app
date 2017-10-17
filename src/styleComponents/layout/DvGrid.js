import styled, {css} from 'styled-components';

export default styled.div`

    .ui.grid {
        margin: 0;
        margin-bottom: 400px;
        
        @media (max-width: 1920px) {
            margin-bottom: 200px;
        }
        
        @media (max-width: 767px) {
            margin-bottom: 60px;
        }
    }
    
    ${props => props.left ? `padding-left: ${props.left}` : `padding-left: 0px`};
    ${props => props.right ? `padding-right: ${props.right}` : `padding-right: 0px`};
    ${props => props.bot ? `padding-bottom: ${props.bot}` : `padding-bottom: 0px`};
    ${props => props.width && css`
        margin: 0 auto;
        max-width: ${props.width};
        
        @media (max-width: 1920px) {
            max-width: 900px
        }
        
        @media (max-width: 991px) {
            max-width: 100%;
            padding: 0 30px;
        }
    `};
    
    @media (min-width: 1921px) {
        ${props => props.indent_bot && css`
            margin-bottom: ${props.indent_bot}
        `};
    }
    
    ${props => props.mL && `margin-left: ${props.mL}`};
    ${props => props.float && `float: ${props.float}`};
    ${props => props.grid && `margin-top: 1rem`};
    ${props => props.grid === "no-pad" && css`
        .ui.grid >.column:not(.row),
        .ui.grid>.row>.column {
            padding-left: 0;
            padding-right: 0;
        }
    `};
`;
