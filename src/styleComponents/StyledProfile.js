import styled from "styled-components";
import { colors, primaryColors } from "./constants/colors";

export default styled.div`
  color: #666666;

  .section-header {
    border-bottom: 2px solid #00ffc0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 14px;
    padding-bottom: 2px;

    &:first-of-type {
      border-bottom: none;
    }

    .title {
      text-transform: uppercase;
      font-style: normal;
    }

    .dots {
      cursor: pointer;
      span {
        display: inline-block;
        height: 3px;
        width: 3px;
        border-radius: 50%;
        background-color: gray;
      }
    }
  }

  .ui.grid {
    padding: 14px;
  }

  .ui.grid > .row {
    padding-top: 36px;

    &:nth-of-type(2n) {
      min-height: 180px;
    }
  }

  h3 {
    margin-top: 5px;
    font-size: 22px;
    font-weight: lighter;
  }
  h3 span {
    display: inline-block;
    padding: 0 8px;
    margin: 0 10px 5px 0;

    border: 1px solid #cbcbcb;
    border-radius: 10px;

    font-size: 14px;
    white-space: pre-line;
    text-transform: none;
    line-height: 18px;
  }

  .billing-type {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  span {
    font-size: 12px;
    line-height: 13px;
    letter-spacing: 0.9px;
    font-weight: bold;
    font-style: italic;
    text-transform: uppercase;
  }

  .profile-item {
    margin-bottom: 1em;

    .profile-label {
      display: inline-block;
      margin: 0 10px 0 0;
    }
  }

  .main-info {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .profile-image {
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
      background: ${primaryColors.accentBackground};
      align-self: flex-end;

      .image-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        border: 0px solid #fff;
        max-width: 291px;
        max-height: 291px;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .profile-info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      height: 100%;

      & > * {
        margin-bottom: 5px;
      }
    }
  }

  .services {
    span {
      img {
        height: 20px;
        width: auto;
        transform: translate(-2px, 4px);
      }
    }
  }

  .skills {
    max-width: 1170px;
    font-size: 28px;

    h4 {
      font-size: 28px;
      text-align: center;
      margin-bottom: 50px;
    }

    .flex-wrapper {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 90px;

      & > div {
        display: inline-block;

        & > div {
          padding: 0 8px;

          line-height: 18px;

          border: 2px solid #cbcbcb;
          border-radius: 12px;
          font-size: 14px;
        }
      }
    }

    p {
      text-align: center;
    }
  }

  .prof-exp {
    margin-top: 20px;
    font-size: 14px;
  }

  .card {
    margin-bottom: 20px;

    & > * {
      margin: 0;
    }
  }

  .billing {
    .billingItem {
      font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
      margin-bottom: 12px;

      p {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 1em;
      }

      span {
        font-size: 16px;
      }
    }
  }

  .ui.grid > .row.educations {
    padding-bottom: 80px;
  }

  @media (max-width: 1920px) {
    /* .main-info {
            font-size: 28px;
        
            h2 {
                font-size: 48px;
            }
            
            p {
                font-size: 34px;
            }
        } */

    .skills {
      font-size: 18px;
      max-width: 1400px;

      /* h4 {
                font-size: 22px;
            } */

      /* .flex-wrapper {
                justify-content: space-around;
            } */
    }
  }

  /* @media (max-width: 768px) {
    
        .main-info {
            font-size: 18px;
            margin-bottom: 40px;
        
            h2 {
                font-size: 36px;
            }
            
            p {
                font-size: 24px;
            }
            
            .profile-image {
                margin-bottom: 30px;
                height: 290px;
                width: 290px;
                
                img {
                    max-width: 290px;
                }
            }
            
            .flex-between {
                justify-content: space-around;
                margin-bottom: 50px;
                
                img {
                    max-width: 24px;
                }
            }
        }
        
        .skills {
            font-size: 14px;
            margin-bottom: 0;
        
            h4 {
                font-size: 22px;
            }
            
            p {
                text-align: justify;
            }
            
            .flex-wrapper {
                justify-content: center;
                margin-bottom: 50px;
            }
        }
    }
    
    @media (max-width: 399px) {
    
        .main-info .flex-between {
            justify-content: center;
            flex-direction: column;
            align-items: center;
            
            span + span {
                margin-top: 15px;
            }
        }
    } */
`;
