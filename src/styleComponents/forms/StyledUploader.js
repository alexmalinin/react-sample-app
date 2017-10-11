import styled from 'styled-components';

export default styled.div`
    
    display: flex;
    align-items: center;
    
    input {
        display: none;
    }
    
    .imgPreview {
        display: inline-block;
        margin-right: 40px;
        
        & img {
            max-height: 279px;
            max-width: 279px;
        }
    }
    
    .preloader {
        border: 2px solid #ccc;
        padding: 40px 39px 0px 36px;
        
        img {
            width: 204px;
        }    
    }
    
    .ui.button {
        font-size: 24px;
        padding: 16px 55px;
    }
    
    @media (max-width: 1920px) {
    
        .imgPreview {
     
            & img {
                max-height: 212px;
                max-width: 212px;
            }
        }
        
        .preloader {
            border: 1px solid #ccc;
            padding: 30px 30px 0px 30px;
            
            img {
                width: 150px;
            }    
        }
        
       .ui.button {
            font-size: 18px;
            padding: 10px 35px;
        } 
    }
    
    @media (max-width: 499px) {
    
        flex-direction: column;
        
        .imgPreview {
            margin: 0 0 30px 0;
        }
    }
`;
