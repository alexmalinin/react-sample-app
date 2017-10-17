import styled from 'styled-components';

export default styled.div`

    .ui.radio.checkbox {
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        z-index: 9999999999;
        width: 100%;
        height: 100%;
      }
    }
    
    .ownRadio {
      position: relative;
    }
    
    .ownInput {
      opacity: 0;
      
      &:checked + .ownRadio {
        
        &::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          width: 9px;
          height: 9px;
          background-color: #1991fa;
          top: 3px;
          left: -17px;
          box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2);
        }
      }
    }
    
    .ownRadio::before {
      top: 0;
      left: -20px;
      content: '';
      position: absolute;
      border-radius: 50%;
      display: block;
      width: 15px;
      height: 15px;
      border: 1px solid #000;
    }
    
    @media(min-width: 1921px) {       
        .ownRadio::before {
            height: 30px;
            width: 30px;
            left: -55px;
            
        }
        
        .ownInput:checked + .ownRadio::after {
            width: 20px;
            height: 20px; 
            top: 5px;
            left: -50px;
        }
    }
`;
