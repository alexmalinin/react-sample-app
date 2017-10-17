import styled, {css} from 'styled-components';

export default styled.div`
    
    max-width: 600px;
    display: inline-block;
    border-top: 10px solid #1991fa;
    border-left: 1px solid #808080;
    border-right: 1px solid #808080;
    text-align: center;
    font-size: 24px;
    font-weight: 300;
    margin: 10px 15px 20px;
    
    b {
        font-weight: bold;
    }
    
    h2 {
        font-size: 48px;
        font-weight: normal;
        margin-bottom: 25px;
    }
    
    .card-content {
        padding: 30px 50px 60px;
    }
    
    .sub-category {
        display: inline-block;
        font-size: 28px;
        font-weight: 300;
        line-height: 36px;
        white-space: pre-wrap;
        margin-bottom: 55px;
    }
    
    .card-description {
        margin-bottom: 90px;
    }
    
    .estimate {
        display: flex;
        justify-content: space-around;
        margin-bottom: 50px;
        
        img {
            margin-right: 15px;
        }
        
        & > span {
            display: flex;
            align-items: center;
        }
    }
    
    .attached.buttons {
        border: 4px solid #1991fa;
        
        button {
            text-transform: uppercase;
            font-size: 24px;
            color: #000;
            background: #fff;
            border-radius: 0 !important; //overwrite semantic-ui
            
            &.blue {
                background:  #1991fa;
                color: #fff;
            
            }
        }
    }
    
    @media (max-width: 1920px) {
        
        border-top: 5px solid #1991fa;
        max-width: 400px;
        font-size: 14px;
        
        
        h2 {
            font-size: 28px; 
        }  
          
        .card-content {
            padding: 30px;
        }  
        
        .sub-category {
            font-size: 17px;
            line-height: 30px;
            margin-bottom: 25px;
        }  
        
        .card-description {
            margin-bottom: 40px;
            text-align: justify;
        }
        
        .estimate {
            margin-bottom: 30px;
        }
        
        .attached.buttons {
            border: 2px solid #1991fa;
            
            button {
                text-transform: uppercase;
                font-size: 17px;
                }
            }
        }
    }
    
    @media (max-width: 1099px) {
        max-width: 355px;
    }
    
    @media (max-width: 991px) {
        
    }
    
    @media (max-width: 767px) {
        margin: 15px 0;
        
        .card-content {
            padding: 20px 10px;
        }
    }
`;
