import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

export const S_Message = styled(Message)`  
    &.ui.message {
        position: absolute;
        top: -153px;
        margin-top: 0;
        right: 22px;
        z-index: 1;
        transition: top 0.7s ease-in-out;
        ${props => props['data-show'] && `top: 0`};
    }
`;
