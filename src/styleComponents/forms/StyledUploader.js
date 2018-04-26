import styled from 'styled-components';

export default styled.div`
    
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    &::after,
    &::before, 
    span{
        content: '';
        display: inline-block;
        width: 100px;
        order: 1;
    }

    ${props => props.fileLoader ? `margin-top: 24px` : ``};
    ${props => props.padded ? `padding: 0 20px` : ``};
    
    input {
        display: none;
    }
    
    .imgPreview {
        display: inline-block;
        margin-right: 40px;
        
        & img {
            width: 120px;
            height: 120px;
            object-fit: ${props => props.projectLogo ? 'contain' : 'cover'};
        }
    }
    
    .preloader {
        padding: 40px 39px 0px 36px;
        
        img {
            width: 120px;
        }    
    }
    
    .ui.button {
        ${props => props.disabled ? "display: none;" : ''}
        width: 35px;
        height: 35px;
        /* padding: 16px 55px; */
    }

    p{
        flex: 0 0 100%;
        font-size: 12px;
        text-transform: uppercase;
        color: #666;
        font-weight: bold;
        word-spacing: 1.5px;
        padding-left: 7px;
    }

    .filePreview{
        display: flex;
        align-items: center;
        height: 40px;
        width: 100px;
        margin-bottom: 10px;
        padding: 5px;
        border: 1px solid #f2f2f2;
        
        img{
            height: 26px;
        }

        .fileInfo{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            margin-left: 3px;

            p{
                padding: 0;
                margin: 0;
                font-size: 10px;
                color: #ccc;
            }
        }

        .detailedInfo{
            position: relative;

            a{
                display: inline-block;
                height: 10px;
                width: 10px;
                margin-left: 5px;
                outline: none;

                &::before{
                    content: '';
                    display: inline-block;
                    position: absolute;
                    height: 6px;
                    width: 6px;
                    top: 40%;
                    left: 50%;
                    border-color: #ccc;
                    border-style: solid;
                    border-width: 0;
                    border-bottom-width: 2px;
                    border-left-width: 2px;
                    transform: rotate(-45deg);
                }

                &:focus~.dropDown{
                    display: inline-block;
                }
            }

            .dropDown{
                position: absolute;
                display: none;
                z-index: 1000;
                right: 0;
                top: calc(100% + 10px);

                min-width: 100px;
                min-height: 50px;
                padding: 8px;
                white-space: nowrap;

                background-color: #fff;
                box-shadow: 0 0 12px 0 #ddd;
            }
        }
    }

    .uploadFile{
        position: relative;
        height: 40px;
        width: 100px;
        background: none;
        margin-bottom: 10px;
        border: 1px solid #f2f2f2;
        cursor: pointer;
        outline: none;

        &::before,
        &::after{
            content: '';
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 1px);
            height: 16px;
            width: 2px;
            background-color: #f2f2f2;
        }

        &::after{
            transform: rotate(90deg);
        }
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
