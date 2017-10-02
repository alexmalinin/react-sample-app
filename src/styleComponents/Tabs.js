import styled from 'styled-components';

export default styled.div`
    ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
    font-size: 28px;   
`;