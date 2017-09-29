import styled, {css} from 'styled-components';
import { Grid, Button, Tab } from 'semantic-ui-react';

export default styled(Tab.Pane)`

    &.ui.segment {
        padding: 50px 60px 14px;
        
        .radio-group {
            padding-left: 7px;
            margin-bottom: 35px;
        }
    }
`;
