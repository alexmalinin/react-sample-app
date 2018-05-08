import styled from "styled-components";
import { primaryColors } from "../constants/colors";

export const S_MainContainer = styled.div`

    max-width: 1920px;
    margin: 0 auto;
    width: 100%;
    padding-top: 87px;
    display: flex;
    justify-content: center;

    ${props => (props.indentBot ? `margin-bottom: 250px` : ``)};
    ${props => (props.indentTop ? `margin-top: 100px` : ``)};
    ${props => (props.relative ? `position: relative` : ``)};

    .frame {
      display: flex;
      align-items: center;
      justify-content: center;
     }

     .frame-load {
         width: 100%;
         height: 100%;
         position: absolute;
         z-index: 1;
         top: 0;
         left: 0;
         transform: rotateY(0deg);
         background-color: rgba(0,0,0,.3);
     }

     .frame-loading {
         width: 100%;
         height: 100%;
         position: absolute;
         top: 0;
         transform: rotateY(180deg);
     }

     .loading {
       transition: transform 0.7s ease-in-out;
       backface-visibility: hidden;

       &.content-load {
         transform: rotateY(0deg);
       }

       &.content-loading {

       }
     }

    {/*@media (max-width: 1920px) {
        max-width: 1230px;
        ${props => (props.indentTop ? `margin-top: 80px` : ``)};
    }

    @media (max-width: 991px) {
        max-width: 100%;
        ${props => (props.indentBot ? `margin-bottom: 100px` : ``)};
    }

    @media (min-width: 768px) {
        padding: 0 20px;
    }*/}
    ${props =>
      props.sidebarCondition &&
      `
        @media (min-width: 1441px) {
            max-width: 100%;
            padding-left: 260px;
            padding-right: ${props.sidebarOpened ? "260px" : "60px"};
        }

        @media (max-width: 1440px) {
            padding-left: 100px;
            padding-right: ${props.sidebarOpened ? "260px" : "60px"};
        }
    `}
`;
