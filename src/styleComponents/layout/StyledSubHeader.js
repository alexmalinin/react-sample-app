import styled from 'styled-components';
export default styled.div`
    height: 131px;
    max-width: 1280px;
    margin: 0 auto;

    ${props => (props.profile || props.account
        ?  `background: #2d68ee; /* Old browsers */
            background: -moz-linear-gradient(left, #2d68ee 0%, #7439e3 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, #2d68ee 0%,#7439e3 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, #2d68ee 0%,#7439e3 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2d68ee', endColorstr='#7439e3',GradientType=1 ); /* IE6-9 */`
        :  `background: #00a2ee; /* Old browsers */
            background: -moz-linear-gradient(left, #00a2ee 0%, #38ffbf 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, #00a2ee 0%,#38ffbf 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, #00a2ee 0%,#38ffbf 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a2ee', endColorstr='#38ffbf',GradientType=1 ); /* IE6-9 */`)
    };
    /* margin-top: 20px; */
    text-align: center;
    z-index: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 30px 15px;
    box-shadow: 0px 0px 16px 0px #ccc;
    ${props => props.profile || props.account ? `margin-bottom: 40px;` : `margin-bottom: 80px;`};
    
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

    .arrow::after,
    .arrow::before {        
        content: '';
        position: absolute;
        right: 40px;
        width: 8px;
        height: 1px;
        background-color: #fff;
    }
    .arrow::after {
        transform: rotate(45deg);
        top: 22px;
        right: 40px;
    }
    span {
        display: block;
        position: absolute;
        top: 25px;
        right: 41px;
        width: 36px;
        height: 1px;
        background-color: #fff;
    }
    .arrow::before {
        transform: rotate(-45deg);
        top: 28px;
        right: 40px;
    }

    .completeLaterLink:hover {
        border: none;

        & > div {
            border: none;
        }
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
