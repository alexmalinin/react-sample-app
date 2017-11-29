import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu'

export default styled(Menu)`

   ul {
      li {
          text-align: right;
                
          &.linked-in {
              display: none;
          }
      }
      
      a {
          display: inline-block;
          font-size: 25px;
          color: #fff;
          padding: 0 25px 0 0;
          line-height: 2.5;
          font-weight: bold;
          width: 100%;
        
         &.proxy {
            text-transform: uppercase;
            margin-top: 25px;
              
            button {
               text-transform: uppercase;
               font-size: 25px;
            }
         }
      }
   }
   
   @media (max-width: 520px) {
      ul {
          li {
              text-align: right;
                    
              &.linked-in {
                  display: none;
              }
          }
          
          a {
              display: inline-block;
              font-size: 20px;
              color: #fff;
              padding: 0 25px 0 0;
              line-height: 2.5;
              font-weight: bold;
              width: 100%;
            
             &.proxy {
                margin-top: 20px;
                  
                button {
                   font-size: 20px;
                }
             }
          }
       }
   }
`;
