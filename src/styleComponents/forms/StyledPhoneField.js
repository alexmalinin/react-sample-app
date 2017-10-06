import styled, { css } from 'styled-components';

export default styled.div`

    display: flex;
    align-items: center;
    margin-bottom: 40px;
    border: 1px solid #ccc;
    
    .phone-wrapper {
      margin: 0;
      display: flex;
      width: 100%;
    
      div:first-child {
        flex: 0 0 25%;
        margin-bottom: 0;
    
        border-radius: 0;
        border-top: none;
        border-bottom: none;
        
      }
    
      div:last-child {
        margin-bottom: 0;
        flex: 0 0 75%;
    
        input {
          border-radius: 0;
          border: none;
          padding-right: 10px;
        }
      }
    }

    & > span {
        text-align: center;
        flex: 0 0 20%;
    }  
    
    @media (min-width: 1921px) {
       margin-bottom: 80px; 
    
       &  > span { 
           font-size: 28px;
       }
    }
      
    @media (max-width: 1920px) {
        margin-bottom: 30px;
    }  
    
    @media (max-width: 1499px) {
      .phone-wrapper {
        div:first-child {
          flex: 0 0 35%;
        }
      
        div:last-child {
          flex: 0 0 65%;
        }
      }
    }  
    
    @media (max-width: 1024px) {
      .phone-wrapper {
        div:first-child {
          flex: 0 0 39%;
        }
      
        div:last-child {
          flex: 0 0 61%;
        }
      }
    } 
    
    @media (max-width: 767px) {
      .phone-wrapper {
        div:first-child {
          flex: 0 0 35%;
        }
      
        div:last-child {
          flex: 0 0 65%;
        }
      }
    }
    
    @media (max-width: 399x) {
      .phone-wrapper {
        div:first-child {
          flex: 0 0 39%;
        }
      
        div:last-child {
          flex: 0 0 61%;
        }
      }
    }
`;
