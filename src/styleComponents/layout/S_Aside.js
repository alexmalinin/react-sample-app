import styled, {css} from 'styled-components';

export const S_Aside = styled.aside`
    position: relative;
     
    .fake {
        width: 200px;
        position: relative;
        transition: all 1s ease-in-out;
    }
                
    .headerAside {
      top: 0;
      position: absolute;
      width: 200px;
      font-size: 20px;
      padding: 10px;
      ${props => props.orientation === 'left' ? css`
          background-color: #f8ab19;
          left: 0;
      ` 
      : css`
          right: 0;
          text-align: right;
          background-color: #3acc33;
      `};
      transition: all 1s ease-in-out;
      
      span {
        padding: 10px;
        color: #fff;
             
        &.iconAside {
          position: absolute;
          ${props => props.orientation === 'left' ? `right: 7px` : 'left: 7px'};
          font-size: 30px;
          top: 0;
          padding: 7px;
        }

        &.arrowLeftAside {
          width: 0; 
          height: 0; 
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-left: 15px solid #f8ab19;
          background-color: #fff;
          font-size: 0;
          padding: 0;
          position: absolute;
          right: 0;
          top: 0;
          transition: all 1s ease-in-out;
        }
        
        &.arrowRightAside {
          width: 0; 
          height: 0; 
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-right: 15px solid #3acc33;
          background-color: #fff;
          font-size: 0;
          padding: 0;
          position: absolute;
          left: 0;
          top: 0;
          transition: all 1s ease-in-out;
        }
      }
    }
    
    .bodyAside {
      top: 39px;
      height: calc(100% - 39px);
      position: absolute;
      background-color: #ccc;
      ${props => props.orientation === 'left' ? `left: 0` : `right: 0`};
      width: 200px;
      transition: all 1s ease-in-out;
    }
    
    ${props => props.open ? css`
        .fake {
          width: 200px;
        }

        .headerAside{
          left: 0;
          
             span.arrowLeftAside {
                border-left: 0 solid #f8ab19;
             }
             
             span.arrowRightAside {
                border-right: 0 solid #3acc33;
             }
        }

        .bodyAside {
          ${props => props.orientation === 'left' ? `left: 0` : `right: 0`};
        }
    ` 
    : css`

        .fake {
          width: 60px;
        }

        .headerAside{
          ${props => props.orientation === 'left' ? `left: -140px` : `right: -140px`};
          //left: -140px;
        }

        .bodyAside {
          ${props => props.orientation === 'left' ? `left: -200px` : `right: -200px`};
          //left: -200px;
        }
    `}
`;



// width: 10px; */
// left: 0;
// width: 200px;
// position: relative;
// transition: left 1s ease-in-out, width 1.5s ease-in-out;
// /* left: -200px; */
// /* width: 0px; */
