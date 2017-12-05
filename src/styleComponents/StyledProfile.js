import styled from 'styled-components'

export default styled.div`

    margin-top: 40px;

    .main-info {
        margin-bottom: 90px;
        text-align: center;
        font-size: 36px;
        
        h2 {
            font-size: 60px;
        }
        
        .profile-image {
            border-radius: 50%;
            margin: 0 auto 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 300px;
            height: 300px;
            border: 4px solid #1991fa;
            
            img {
                border-radius: 50%;
                border: 9px solid #fff;
                max-width: 300px;
                max-height: 300px;
            }
        }
        
        .flex-between {
            display: flex;
            justify-content: space-between;
            max-width: 650px;
            margin: 0 auto;
            
            span {
                display: flex;
                align-items: center;
                font-weight: 300;
                
                img {
                    margin-right: 15px;
                }
            }
        }
    }
    
    .skills {
        max-width: 1170px;
        font-size: 28px;
        margin: 0 auto 90px;
        
        h4 {
            font-size: 28px;
            text-align: center;
            margin-bottom: 50px;
        }
        
        .flex-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 90px;
        }
        
        p {
            text-align: center;
        }
    }
    
    @media (max-width: 1920px) {
    
        .main-info {
            font-size: 28px;
        
            h2 {
                font-size: 48px;
            }
            
            p {
                font-size: 34px;
            }
        }
        
        .skills {
            font-size: 18px;
        
            h4 {
                font-size: 22px;
            }
            
            .flex-wrapper {
                justify-content: space-around;
            }
        }
    }
    
    @media (max-width: 768px) {
    
        .main-info {
            font-size: 18px;
            margin-bottom: 40px;
        
            h2 {
                font-size: 36px;
            }
            
            p {
                font-size: 24px;
            }
            
            .profile-image {
                margin-bottom: 30px;
                height: 290px;
                width: 290px;
                
                img {
                    max-width: 290px;
                }
            }
            
            .flex-between {
                justify-content: space-around;
                margin-bottom: 50px;
                
                img {
                    max-width: 24px;
                }
            }
        }
        
        .skills {
            font-size: 14px;
            margin-bottom: 0;
        
            h4 {
                font-size: 22px;
            }
            
            p {
                text-align: justify;
            }
            
            .flex-wrapper {
                justify-content: center;
                margin-bottom: 50px;
            }
        }
    }
    
    @media (max-width: 399px) {
    
        .main-info .flex-between {
            justify-content: center;
            flex-direction: column;
            align-items: center;
            
            span + span {
                margin-top: 15px;
            }
        }
    }
`;
