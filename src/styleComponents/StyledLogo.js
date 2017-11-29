import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const StyledLogo = styled(NavLink)`
    
    @media (max-width: 1920px) {
        img {
            max-width: 300px;
        }
    }
    
    @media (max-width: 767px) {
        img {
            max-width: 220px;
        }
    }
`;

