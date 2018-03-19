import styled from 'styled-components';

export default styled.header`

    &.header-basic {
    
        div {
            min-width: 20%;
            display: flex;
            justify-content: space-between;
        }
 
        & > div {
            min-height: 87px;
            align-items: center;
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

    & .square, 
    & .settings,
    & .avatar {
        width: 22px;
        height: 21px;
        display: flex;
        background: url('../../images/header-icon-square.png');
    }

    & .settings {
        background: url('../../images/header-icon-settings.png');
    }

    & .avatar {
        background: url('../../images/uploadImg.png');
        background-size: cover;
    }    

    & .logOut {
        display: block;
        width: 22px;
    }

    & .logOut::before,
    & .logOut::after {
        content: '';
        width: 11px;
        height: 2px;
        transform: rotate(45deg);
        position: absolute;
        top: 15px;
        right: 0;
        background-color: #ccc;
    }

    & .logOut::after {
        transform: rotate(-45deg);
        top: 8px;
        right: 0;
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
