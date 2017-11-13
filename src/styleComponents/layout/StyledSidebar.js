import styled from 'styled-components';
import {Sidebar} from 'semantic-ui-react';

export default styled(Sidebar)`

   ul {
   
      li {
          text-align: right;
          padding: 15px 10px;
          border-bottom: 1px solid #313131;
                
          &.linked-in {
              display: none;
          }
      }
      
      a {
         color: #fff;
         font-size: 16px;
        
         &.proxy {
            text-transform: uppercase;
              
            button {
               text-transform: uppercase;
            }
         }
      }
   }
`;
