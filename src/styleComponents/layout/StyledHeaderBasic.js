import styled from "styled-components";
import { secondaryColors } from "../constants/colors";

export default styled.header`

    &.header-basic {
        position: fixed;
        z-index: 1000;
        width: 100%;
        background-color: #fff;
        padding-left: 40px;
        padding-right: 40px;

        &>div {
            min-width: 20%;
            display: flex;
            justify-content: space-between;

            .right-links{
                display: flex;
                min-width: auto;

                a{
                    margin-right: 15px;
                    margin-left: 15px;
                }
            }
        }

        & > div {
            min-height: 87px;
            align-items: center;
            background-color: #fff;
        }

        a {
            color: #666;
            font-family: 'Brix', sans-serif;
            font-size: 14px;
            font-weight: bold;
            line-height: 27px;
            text-transform: uppercase;
            letter-spacing: 3.22px;
            position: relative;
        }

        a.button {
          font-size: 12px;

          &.active {
            border-bottom: 2px solid ${secondaryColors.green};
          }
        }
    }

    .square,
    .settings,
    .avatar {
        width: 22px;
        height: 21px;
        display: flex;
        background: url('../../images/header-icon-square.png');
    }

    .settings {
        background: url('../../images/header-icon-settings.png');
    }

    .avatar {
        background: url('../../images/uploadImg.png');
        background-size: cover;
    }

    .ui.dropdown {
        .text{
            padding-right: 40px;

            text-transform: uppercase;
            color: #4d4d4d;
            font-family: "Brix";
            font-weight: 500;
            line-height: 23px;
            user-select: none;
        }

        .drop-icon{
            position: absolute;
            right: 20px;
            top: 10px;

            &::before,
            &::after,
            span{
                content: '';
                position: absolute;
                display: inline-block;
                height: 2px;
                width: 14px;
                background: #d0d0d0;
                transform-origin: 0 1px;
                transition: .4s ease-in-out;
            }

            span{
                transform: rotate(45deg);
            }

            &::before{
                transform: rotate(-45deg);
            }

            &::after{
                transform: rotate(-45deg);
                left: 10px;
                top: 10px;
                width: 0px;
            }
        }

        &.active{
            .drop-icon{
                &::before{
                    width: 0px;
                }
                &::after{
                    width: 14px;
                }
            }
        }

        .menu{
            top: 40px;
            left: auto;
            right: -5px;
            user-select: none;
            min-width: 200px;

            .item a{
                letter-spacing: 2px;
            }
        }
    }

    .log-out {
        /* position: relative; */
        width: 30px;
        outline: none;

        &::after {
            content: '';
            display: inline-block;
            width: 14px;
            height: 14px;
            position: absolute;
            top: calc(50% - 7px);
            right: 0;

            transform: rotate(45deg);
            transform-origin: 50% 50%;
            border-left: 2px solid #ccc;
            border-bottom: 2px solid #ccc;
            transition: .2s ease-in-out;
        }

        &:focus{
            &::after{
                transform: rotate(-45deg);
            }

            &~.log-dropdown{
                display: flex;
            }
        }
    }

    @media (max-width: 1920px) {
       &.header-basic {
        box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.15);


        & > div {
            min-height: 87px;
        }

        a {
            font-size: 14px;

            img {
                width: 60px;
            }
        }
    }
`;
