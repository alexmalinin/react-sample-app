import styled from 'styled-components';

export default styled.div`

    font-size: 14px;
    letter-spacing: 1.2px;
    color: #666;
    flex-basis: 33%;

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
      padding-left: 20px;
    }
    
    .ownInput {
      opacity: 0;
      position: absolute;
      
      &:checked + .ownRadio {
        
        &::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background-color: #ccc;
          top: 0px;
          left: 0px;
          /* box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2); */
        }
      }
    }
    
    .ownRadio::before {
      top: 0;
      left: 0;
      content: '';
      position: absolute;
      border-radius: 50%;
      display: block;
      width: 15px;
      height: 15px;
      border: 1px solid #ccc;
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
