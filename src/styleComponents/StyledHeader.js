import styled from 'styled-components';

export default styled.header`

    &.header-intro {
      height: 199px;
    
      .inside-header {
        position: fixed;
        width: 100%;
        z-index: 2;
      }
    
      .top-header {
        padding-top: 27px;
        height: 100px;
        background-color: #1d7bff;
      }
    
      .bot-header {
        height: 98px;
        background-color: #a600ea;
    
        .right-board {
          margin: 0;
          display: inline-block;
          float: right;
        
          li {
            display: inline-block;
            line-height: 98px;
        
            &.proxy {
              a {
                font-family: "Proxima Nova", sans-serif;
                text-transform: uppercase;
                font-weight: 600;
        
                &:last-child:after {
                  content: none;
                }
              }
        
              button {
                font-family: "Proxima Nova", sans-serif;
                text-transform: uppercase;
                font-weight: 600;
                font-size: 20px;
              }
            }
        
            & + li a {
              margin-left: 20px;
            }
        
            a {
              color: #fff;
              font-family: Roboto, sans-serif;
              font-size: 20px;
              position: relative;
        
              &:after {
                transition: all .4s ease;
                content: '';
                height: 2px;
                position: absolute;
                left: 0;
                bottom: -3px;
                width: 0;
              }
        
              &:hover:after {
                background: #fff;
                width: 100%;
              }
        
              &.active:after {
                background: #fff;
                width: 100%;
              }
            }
          }
        }
      }
    }
    
    &.header-basic {
      height: 137px;
    
      .top-header {
        display: inline-block;
        padding-left: 6.9%;
      }
    
      .bot-header {
        display: inline-block;
        float: right;
        padding-right: 9.2%;
    
        a {
          line-height: 137px;
          color: #1991fa;
          font-family: "Proxima Nova";
          font-size: 24px;
          font-weight: 600;
          text-decoration: underline;
          text-transform: uppercase;
        }
      }
    }
    
    &.header-intro .ui.segment {
      margin-top: 0;
      padding: 26px 26px 26px 8%;
    }  
    
    @media (max-width: 1920px) {
      &.header-intro {
        height: 150px;
    
        .top-header {
          height: 50px;
          padding-top: 10px
        }
    
        .bot-header {
          height: 65px;
    
          .right-board {
            li {
              line-height: 64px;
    
              a {
                font-size: 18px;
              }
            }
    
            &.right-board li.proxy button {
              font-size: 18px;
            }
          }
        }
      }
    }
`;
