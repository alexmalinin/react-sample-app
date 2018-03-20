import styled from 'styled-components';

export default styled.header`

    &.header-basic {
        position: fixed;
        z-index: 1000;
        width: 100%;
        background-color: #fff;
        padding-left: 40px;
        padding-right: 40px;
    
        div {
            min-width: 20%;
            display: flex;
            justify-content: space-between;

            .log-out{
                min-width: auto;
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

    .ui.dropdown .menu{
        top: 150%;
        left: auto;
        right: -20%;
        user-select: none;
    }

    .log-out {
        position: relative;

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

        &.active{
            &::after{
                transform: rotate(-45deg);
            }
        }
    }
    
    @media (max-width: 1920px) {
       &.header-basic {
        -webkit-box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);
        -moz-box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);
        box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);


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
