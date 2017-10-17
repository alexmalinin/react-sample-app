import styled from 'styled-components';
import { Card } from 'semantic-ui-react';

export const StyledEducationCard = styled(Card)`

    &.ui.card {
        width: 48%;
        border-radius: 0;
        margin: 0;
        
        &>.content {
            padding: 50px 30px;
            
            >.header:not(.ui) {
                font-size: 20px;
                margin-bottom: 15px;
            }    
            
            >.description {
                color: #000;
            }
        }
        
        .meta {
            font-size: 18px;
            color: #000;
            font-weight: 300;
        }
        
        .period,
        .location {
            display: flex;
            align-items: center;
            margin: 25px 0;
            
            img {
                width: 30px;
                margin-right: 15px;
            }
        }
    }
    
    @media (min-width: 1921px) {
        &.ui.card{

            &>.content {
                padding: 50px 80px;
                
                >.header:not(.ui) {
                    font-size: 48px;
                    margin-bottom: 25px;
                }    
                
                >.description {
                    color: #000;
                    
                    p {
                        margin-bottom: 40px;
                    }
                }
            }
            
            .meta {
                font-size: 36px;
                font-weight: 300;
                line-height: 1;
            }
            
            .period {
                margin: 40px 0;
                
                img {
                    width: auto;
                    margin-right: 25px;
                }
            }
        }
    }
    
    @media (max-width: 767px) {
    
        &.ui.card {
            width: 75%;
            margin: 15px 0;
        }
    }
    
    @media (max-width: 499px) {
    
        &.ui.card {
            width: 100%;
        }
    }
`;
