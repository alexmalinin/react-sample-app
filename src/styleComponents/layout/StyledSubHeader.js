import styled from 'styled-components';

export default styled.div`

    width: 100%;
    height: 131px;
    background: #00a2ee; /* Old browsers */
    background: -moz-linear-gradient(left, #00a2ee 0%, #38ffbf 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #00a2ee 0%,#38ffbf 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #00a2ee 0%,#38ffbf 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a2ee', endColorstr='#38ffbf',GradientType=1 ); /* IE6-9 */
    margin-top: 21px;
    text-align: center;
    z-index: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 37px 30px 15px;
    box-shadow: 0px 0px 16px 0px #ccc;
    
    & > span {
      padding: 10px;
    }
    
    div {
        display: flex;
        
    }

    .rightLink {
        font-size: 15px;
    }

    .arrow::after,
    .arrow::before {        
        content: '';
        position: absolute;
        right: 42px;
        width: 8px;
        height: 1px;
        background-color: #fff;
    }
    .arrow::after {
        transform: rotate(45deg);
        top: 18px;
    }
    span {
        display: block;
        position: absolute;
        top: 21px;
        right: 44px;
        width: 36px;
        height: 1px;
        background-color: #fff;
    }
    .arrow::before {
        transform: rotate(-45deg);
        top: 24px;
    }

    .completeLaterLink > div {
        border: none;
        width: 53px;
        background: url('../../images/completeLater.png') no-repeat;
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
        font-family: Roboto, sans-serif;
        font-size: 10px;
        font-weight: bold;
        line-height: 27px;
        text-transform: uppercase;
        letter-spacing: 0.8px;
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
