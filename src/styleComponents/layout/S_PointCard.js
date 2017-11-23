import styled from 'styled-components';
import { Icon } from 'semantic-ui-react'

export const S_PointCard = styled(Icon)`  
      position: absolute;
      right: 0px;
      ${props => props['data-edit'] ? 'right: 40px;' : ''}
      top: 0px;
      width: 40px!important;
      height: 40px!important;
      padding-top: 13px;
      cursor: pointer;
`;
