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
            
            border: 1px solid #ccc;
            border-radius: 0;
        }
    }
    
    @media (max-width: 1920px) {
        margin-bottom: 30px;
    }
`;