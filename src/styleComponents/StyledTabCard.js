import styled from 'styled-components';
import { Tab } from 'semantic-ui-react'

export const RenderWorkCard = styled.div`
    
    
    border: 2px solid #808080;
    ${props => props.border ? `border-top: 10px solid ${props.border}` : `border-top: 10px solid #1991fa`};
    max-width: 1240px;
    margin: 0 auto;
    line-height: 1;
    
    
    .header-card,
    .content-card,
    .action-card {
       padding: 40px 80px; 
    }
    
    .header-card {
        
        h2 {
            font-size: 48px;
            margin-bottom: 25px;
        }
        
        span {
            display: inline-block;
            font-size: 36px;
            margin-bottom: 50px;
        }
        
        p {
            display: flex;
            align-items: center;
            font-size: 28px;
            
            img {
                margin-right: 15px;
            }
        }
    }
    
    .content-card {
        font-size: 28px;
        border-top: 2px solid #808080;
        
        h4 {
            font-size: 28px;
            margin-bottom: 40px;
        }
    }
    
    .action-card {
        font-size: 28px;
        
        a {
            padding-left: 60px;
            position: relative;
            cursor: pointer;
            
            
            &:before {
                content: '';
                position: absolute;
                width: 34px;
                height: 2px;
                background: #1991fa;
                left: 0;
                top: calc(50% - 1px);
            }
            
            &:after {
                content: '';
                position: absolute;
                width: 2px;
                height: 33px;
                background: #1991fa;
                left: 16px;
                top: 0;
                transition: all .5s ease-in-out;
            }
            
            &.active:after {
                transform: rotate(90deg);
                background: transparent;
            }
        }
    }
`;

export const StyledTabs = styled(Tab)`
    
    .ui.text.menu {
        justify-content: center;
        font-size: 36px;
        
        .item {
            position: relative;
            
            &.active {
                color:  #1991fa; 
                 
                &:after {
                    content: '';
                    position: absolute;
                    height: 2px;
                    width: 100%;
                    background: #1991fa;
                    bottom: 2px;
                    left: 0;
                }
            }
        }
    }
    
    .ui.segment {
        border: none;
        box-shadow: none;
    }
`;
