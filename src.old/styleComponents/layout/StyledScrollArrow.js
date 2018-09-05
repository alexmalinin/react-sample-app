import style, { css } from "styled-components";

export const StyledScrollArrow = style.div`
    position: fixed;
    right: 5%;
    bottom: 10%;
    cursor: pointer;
    width: 45px;
    height: 45px;
    animation: animationFrames linear 3s;
    animation-iteration-count: infinite;
    transform-origin: 50% 50%;
    
    @keyframes animationFrames{
      0% {
        transform:  translate(0px,0px)  ;
      }
      15% {
        transform:  translate(0px,-25px)  ;
      }
      30% {
        transform:  translate(0px,0px)  ;
      }
      45% {
        transform:  translate(0px,-15px)  ;
      }
      60% {
        transform:  translate(0px,0px)  ;
      }
      75% {
        transform:  translate(0px,-5px)  ;
      }
      100% {
        transform:  translate(0px,0px)  ;
      }
    }
`;

export const ColoredSpan = style.span`
    
    ${props =>
      props.color &&
      css`
        background: ${props.color};
      `};
    position: absolute;
    height: 2px;
    width: 25px;
    border-radius: 10px;
    left: 20px;
    transform: rotate(145deg);
    
    &:first-child {
        top: 6px;
    }
    
    &:nth-child(2) {
        top: 9px;
        left: 0;
        transform: rotate(-145deg);
    }
    
    &:last-child {
        top: 12px;
    }
`;
