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
            display: inline-block;
            margin-bottom: 60px;
            border-radius: 50%;
            border: 4px solid #1991fa;
            
            img {
                border-radius: 50%;
                      border: 9px solid #fff;
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
        margin: 0 auto;
        font-size: 28px;
        
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
`;
