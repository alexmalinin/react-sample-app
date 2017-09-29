import styled, {css} from 'styled-components';

export default styled.div`  
 
    position: relative;
    margin-bottom: 40px;
    
    .ui.input {
        width: 100%;
        
        input {
            ::-webkit-input-placeholder {color: #000}
            :-moz-placeholder           {color: #000}
            ::-moz-placeholder          {color: #000}
            :-ms-input-placeholder      {color: #000}
        }
    }
`;