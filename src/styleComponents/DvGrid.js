import styled, {css} from 'styled-components';

export default styled.div`
    ${props => props.left ? `padding-left: ${props.left}` : `padding-left: 0px`};
    ${props => props.right ? `padding-right: ${props.right}` : `padding-right: 0px`};
    ${props => props.bot ? `padding-bottom: ${props.bot}` : `padding-bottom: 0px`};
    ${props => props.width && css`
        margin: 0 auto;
        width: ${props.width};
    `};
    ${props => props.grid && `margin-top: 1rem`};
    ${props => props.grid === "no-pad" && css`
        .ui.grid >.column:not(.row),
        .ui.grid>.row>.column {
            padding-left: 0;
            padding-right: 0;
        }
    `};
    
`;