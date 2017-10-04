import styled from 'styled-components';

export default styled.div`

    ${props => props.mTop ? `margin-top: ${props.mTop}px` : `margin-top: 0px`};
    
    font-size: 28px;
    font-family: Roboto, sans-serif;
    width: 850px;
    font-weight: 400;
  
    .form-header {
      height: 73px;
      line-height: 73px;
      text-align: center;
      color: #fff;
      background-color: #1991fa;
    }
  
    .form-body {
      padding: 72px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
  
    .form-footer {
      height: 73px;
      text-align: center;
      color: #fff;
      background-color: #1991fa;
      border-radius: 0;
      width: 100%;
      font-size: 24px;
      font-family: Roboto, sans-serif;
    }
  
    .ui.segment.active.tab {
      color: #000;
    }
  
    .ui {
      &.text.menu {
        margin: 0 auto;
        border: 1px solid #ccc;
  
        .item {
          width: 50%;
          line-height: 73px;
          text-align: center;
          display: inline-block;
          font-size: 28px;
          padding: 0;
          color: #000;
          background-color: #fff;
  
          &.active {
            color: #fff;
            background-color: #1991fa;
  
            &:hover {
              background-color: #1991fa;
            }
          }
        }
      }
  
      &.segment.active.tab {
        margin-top: 0;
        border-radius: 0;
        box-shadow: none;
        border: 1px solid #ccc;
        border-top: 0;
        border-bottom: 0;
      }
    }
        
    .radio-group .ui.radio.checkbox {
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
        font-weight: bold;
        
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
    
    @media (max-width: 1920px) {
      width: 650px;
      margin-top: 40px;
      
      .ui {
        &.text.menu {
          .item {
            line-height: 60px;
            font-size: 24px;
          }  
        }
      }
    }
    
    @media (max-width: 1499px) {
       width: 475px;
       
       .ui {
        &.text.menu {
          .item {
            line-height: 45px;
            font-size: 20px;
          }  
        }
      }
    }
    
    @media (max-width: 1024px) {
       width: 400px; 
    }
    
    @media (max-width: 767px) {
       width: 560px;
       margin 40px auto 0;
       border: none;
       
       .ui {
          &.segment.active.tab {
            border: none;
          }
       }     
    }
    
     @media (max-width: 600px) {
       width: 100%;
       margin 40px auto 0;
       border: none;
    }
`;
