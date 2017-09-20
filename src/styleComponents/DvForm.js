import styled, {css} from 'styled-components';

export default styled.form`
    ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
    font-size: 28px;   
`;