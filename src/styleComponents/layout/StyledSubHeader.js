import styled from 'styled-components';

export default styled.div`

    width: 100%;
    height: 110px;
    background-color: #1991fa;
    margin-top: 52px;
    text-align: center;
    z-index: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    a {
        color: #fff;
        font-family: Roboto, sans-serif;
        font-size: 24px;
        position: relative;
    
        & + a {
            margin-left: 60px;
        }
        
        &:after {
            transition: all .4s ease;
            content: '';
            height: 2px;
            position: absolute;
            left: 0;
            bottom: -3px;
            width: 0;
        }
        
        &:hover {
            color: #fff;
            
            &:after {
                background: #fff;
                width: 100%;
            }    
        }
        
        &.active:after {
            background: #fff;
            width: 100%;
        }    
    }
    
    @media (max-width: 1920px) {
        height: 75px;
    }
    
    @media (max-width: 991px) {
        
        a {
            font-size: 20px;
            
            & + a {
                margin-left: 30px;
            }
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
            font-size: 16px;
            
            & + a {
                margin-left: 20px;
            }
        }
    }
`;
