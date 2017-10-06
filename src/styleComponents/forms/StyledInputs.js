import styled from 'styled-components';

export default styled.div`
 
    position: relative;
    margin-bottom: 30px;
    
    
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
    
    @media (min-width: 1921px) {
        
       margin-bottom: 40px;
        
       .ui.input {
           font-size: 28px;
       } 
       
       .Select-control {
           height: 74px;
        }
        
       .Select-placeholder {
           padding: 0 25px;
           line-height: 74px;
           font-size: 28px;
       }
        
       .Select-value {
           font-size: 28px;
           padding-left: 25px !important; //overwrite theme
           
           span {
               line-height: 74px;
           }
       }
    }
`;