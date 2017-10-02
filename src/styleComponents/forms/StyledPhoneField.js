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

    span {
        text-align: center;
        flex: 0 0 20%;
    }    
`;
