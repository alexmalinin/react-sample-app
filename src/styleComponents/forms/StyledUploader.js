import styled from 'styled-components';

export default styled.div`
    
    position: relative;
    display: flex;
    align-items: center;
    
    input {
        display: none;
    }
    
    .imgPreview {
        display: inline-block;
        margin-right: 40px;
        
        & img {
            width: 120px;
            height: 120px;
            object-fit: cover;
        }
    }
    
    .preloader {
        padding: 40px 39px 0px 36px;
        
        img {
            width: 120px;
        }    
    }
    
    .ui.button {
        width: 35px;
        height: 35px;
        /* padding: 16px 55px; */
    }
    
    @media (max-width: 1920px) {
    
        .imgPreview {

            margin-left: 30px;
     
            & img {
                height: 120px;
                width: 120px;
                border-radius: 50%;
            }
        }
        
        .preloader {
            padding: 0;
            
            img {
                width: 120px;
            }    
        }
        
       .ui.button {
            padding: 60px !important;
            border-radius: 50%;
            position: relative;
            background-color: transparent !important;
            position: absolute;
            top: 0px;
            left: 30px;
        } 
        .ui.button::after,
        .ui.button::before {
            content: '';
            width: 35px;
            height: 5px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #00ffc0;
            position: absolute;
            opacity: 0;
        }
        .ui.button::after{
            height: 35px;
            width: 5px;
        }

        .ui.button:hover.ui.button::after,
        .ui.button:hover.ui.button::before {
                opacity: 1;
            }
        }
    }
    
    @media (max-width: 499px) {
    
        flex-direction: column;
        
        .imgPreview {
            margin: 0 0 30px 0;
        }
    }
`;
