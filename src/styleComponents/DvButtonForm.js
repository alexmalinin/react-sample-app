import styled, {css} from 'styled-components';
import { Grid, Button } from 'semantic-ui-react'

export default styled(Button)`   
    &.ui.button {
        border-radius: 0;
        width: calc(100% + 28px);
        margin-left: -14px;
        margin-bottom: -14px;
        font-size: 24px;
        font-family: Roboto;
        text-align: center;
        color: #fff;
    }
`;