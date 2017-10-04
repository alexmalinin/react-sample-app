import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';

export default styled(Tab.Pane)`

    &.ui.segment {
        padding: 50px 60px 14px;
        
        .radio-group {
            padding-left: 7px;
            margin-bottom: 25px;
        }
        
        @media (max-width: 1920px) {
            padding: 35px 40px 14px;
        }
        
        @media (max-width: 1024px) {
            padding: 20px 20px 14px;
        }
        
        @media (max-width: 767px) {
            padding: 20px 0 0;
        }
    }
`;
