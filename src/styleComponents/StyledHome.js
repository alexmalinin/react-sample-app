import styled, {css} from 'styled-components';
import { NavLink } from 'react-router-dom'

export const FullScreen = styled.div`
    
    min-height: 800px;
    height: 100vh;
    
    & > p {
        text-align: center;
    }
    
    ${props => props.centered && css`
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    `};
    
    ${props => props.indent && `margin-top: 160px;`};
`;

export const ColoredLinks = styled(NavLink)`
    
    ${props => props.color && css`
        color: ${props.color};
        position: relative;
        
        &:after {
            content: '';
            transition: all .5s ease-in-out;
            position: absolute;
            left: 0;
            bottom -2px;
            height: 2px;
            width: 100%;
            background: ${props.color};
        }
        
        &:hover {
            color: ${props.color};
            
            :after {
                width: 0;
                background: transparent;
            }
        }
    `};
`;

export const StyledHome = styled.div`
    
    font-size: 30px;
    line-height: 1;
    
    img {
        max-width: 650px;
        margin-bottom: 30px;
    }
    
    p {
        font-weight: 300;
        
        &.bolder {
            font-weight: bolder;
            color: #1991fa;
        }
    }
    
    .values {
        border-top: 3px solid #1991fa;
        padding: 20px 0;
        margin-top: 30px;
        
        span {
            font-weight: 300;
            display: block;
            margin-bottom: 15px;
        }
        
        p {
            font-size: 18px;
            font-weight: 400;
        }
    }
    
    .title {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 70px 20% 70px 0;
        font-size: 44px;
        border-right: 3px solid #1991fa;
    }
    
    .description {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 21px;
        font-weight: 300;
        padding-left: 10%;
        line-height: 1;
    }
`;
