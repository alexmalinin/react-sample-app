import styled from 'styled-components';

export default styled.div`
    height: 131px;
    max-width: 1280px;
    margin: 0 auto;
    margin-top: 20px;

    ${props => (props.profile || props.account || props.dashboardSubHeader
        ?  `background: #2d68ee; /* Old browsers */
            background: -moz-linear-gradient(left, #2d68ee 0%, #7439e3 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, #2d68ee 0%,#7439e3 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, #2d68ee 0%,#7439e3 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2d68ee', endColorstr='#7439e3',GradientType=1 ); /* IE6-9 */
            margin-top: 20px;`
        :  `background: #00a2ee; /* Old browsers */
            background: -moz-linear-gradient(left, #00a2ee 0%, #38ffbf 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, #00a2ee 0%,#38ffbf 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, #00a2ee 0%,#38ffbf 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a2ee', endColorstr='#38ffbf',GradientType=1 ); /* IE6-9 */`)
    };
    text-align: center;
    z-index: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 30px 15px;
    box-shadow: 0px 0px 16px 0px #ccc;
    ${props => (props.profile || props.account || props.projects) ? `margin-bottom: 40px;` : `margin-bottom: 80px;`};
    
    & > span {
      padding: 10px;
    }

    div {
        display: flex;
    }

    .profileLink{
        font-size: 8px;
    }

    .rightLink {
        font-size: 15px;
    }

    .accountSub {
        font-size: 10px;
        width: 74px;
        height: 74px;
    }

    .addButt{
        &::after,
        &::before{
            content: '';
            height: 20px;
            width: 1px;
            background: #fff;
            position: absolute;
        }
        &::after{
            transform: rotate(90deg);
        }
    }
    
    .close::after,
    .close::before {     
      content: '';
      position: absolute;
      width: 18px;
      height: 1px;
      background-color: #fff;
    }
    .close::after {
      transform: rotate(45deg);
      top: 24px;
    }
    .close::before {
      transform: rotate(135deg);
      top: 24px;
    }

    .teamSubLink {
        margin-top: 10px;
        width: 60px;
        height: 60px;
        font-size: 12px;
    }

    .addLink::before,
    .addLink::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 1px;
        background-color: #fff;
    }

    .addLink::after {
        transform: rotate(90deg);
    }

    .arrow::after,
    .arrow::before {        
        content: '';
        position: absolute;
        top: 25px;
        right: 45%;
        width: 8px;
        height: 1px;
        background-color: #fff;
        transform: rotate(45deg);
        transform-origin: 100% 50%;
    }

    .arrow::before {
        transform: rotate(-45deg);
    }

    span {
        display: block;
        position: absolute;
        top: 25px;
        right: 45%;
        width: 42px;
        height: 1px;
        background-color: #fff;
    }

    .completeLaterLink:hover {
        border: none;

        & > div {
            border: none;
        }
    }

    .filterVillage,
    .arrowVillage {
        border: none !important;
        font-size: 12px;
        font-weight: normal;
    }

    .arrowVillage {
        margin:0;
        width: 10px;
    }

    .filterVillage:hover,
    .arrowVillage:hover,
    .filterVillage:focus,
    .arrowVillage:focus, {
        border: none;
    }

    .arrowVillage::before,
    .arrowVillage::after {
        content: '';
        position: absolute;
        top: 33px;
        left: 0;
        width: 8px;
        height: 1px;
        transform: rotate(45deg);
        background-color: #fff; 
    }

    .arrowVillage::before {
        top: 28px;
        transform: rotate(-45deg);
    }

    .dashboard {
        width: 62px;
        height: 62px;
        font-size: 10px;
    }

    .addLikSmall {
        width: 55px;
        height: 55px;
        font-size: 15px;
    }

    .dashboard.active {
        border: 1px solid #fff;
    }

    a {
        position: relative;
        color: #fff;
        opacity: 0.7;
        font-family: 'Brix', sans-serif;
        font-size: 12px;
        font-weight: bold;
        line-height: 27px;
        text-transform: uppercase;
        text-decoration: none;
    
        & + a {
            margin-left: 12px;
        }
        
        /* &:after {
            transition: all .4s ease;
            content: '';
            height: 2px;
            position: absolute;
            left: 0;
            bottom: -3px;
            width: 0;
        } */
        
        &:hover, &.active {
            color: #fff;
            opacity: 1;
            
            & > div {
                border: 1px solid #fff;
            }

            /* &:after {
                background: #fff;
                width: 100%;
            }     */
        }
        
        /* &.active:after {
            background: #fff;
            width: 100%;
        }     */
    }

    
    @media (max-width: 1920px) {
        height: 131px;
    }
    
    @media (max-width: 991px) {
        
        a {
            font-size: 10px;
/*             
            & + a {
                margin-left: 30px;
            } */
        } 
    }
    
    @media (max-width: 640px) {
        flex-wrap: wrap;
        justify-content: space-between;
        
        a {
          margin: 0 18px !important;
        }
    }
    
    @media (max-width: 401px) {
        a {
            font-size: 10px;
            
            & + a {
                margin-left: 20px;
            }
        }
    }
`;
