import styled, { css } from 'styled-components';
import Select from 'react-select';

export default styled(Select)`
    
    & .Select-control {
        border-radius: 0;
    }
    
    ${props => props.error && css`
        & .Select-control {
            border-color: #e0b4b4;
            background-color: #fff6f6;
        }  
          
        & .Select-placeholder{
            color: #e7bdbc;
        }
    `}

`;