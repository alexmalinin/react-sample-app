import styled from 'styled-components';

export const S_Board = styled.div`

    max-width: 1280px;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    user-select: none;

    h3 {
        text-transform  : uppercase;
        font-size: 14px;
        padding-bottom: 15px;
        /* flex: 0 0 31.5%; */

        border-width: 0px;
        border-bottom-width: 3px;
        border-style: solid;
        -webkit-border-image: 
            -webkit-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
        -webkit-border-image: 
            -webkit-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
        -moz-border-image:
            -moz-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
        -o-border-image:
            -o-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
        border-image:
            linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
    }
    
    .dragContainer {
        flex: 0 0 31.5%;
        margin-bottom: 20px;

        &:last-of-type{
            .module{
                min-height: auto;                                
            }
        }
    }

    .kanban{
        width: 100%;

        display: flex;
        justify-content: space-between;
        background: none;
        height: auto;

        &>section{
            flex: 0 0 31.5%;
            background: none;
            max-height: 100%;
            height: 100%;
            overflow: visible;
            margin: 0;
            padding: 0;

            &>header{
                text-transform  : uppercase;
                font-size: 14px;
                padding-bottom: 15px;
                margin-bottom: 20px;
                z-index: 900;

                border-width: 0px;
                border-bottom-width: 3px;
                border-style: solid;
                -webkit-border-image: 
                    -webkit-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
                -webkit-border-image: 
                    -webkit-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
                -moz-border-image:
                    -moz-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
                -o-border-image:
                    -o-linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
                border-image:
                    linear-gradient(left, #2d68ee 0%, #7439e3 100%) 100% 2 stretch;
            }

            &>div{
                width: 100%;
                overflow: visible;

                article{
                    max-width: 100%;
                    width: 100%;
                    padding-top: 30px;
                }
            }
        }
    }

    .moduleWrapper{
        display: flex;
        flex-flow: row wrap;
        justify-content:space-between;

        &::after{
            content: '';
            height: 0;
            flex: 0 0 31.5%;
        }
    }

    .dragItem{
        position: relative;
        padding: 20px;
        box-shadow: 0px 0px 8px 0px #ccc;

        text-transform: uppercase;

        &::before{
            content: '...';
            position: absolute;
            top: 5px;
            right: 20px;
            font-size: 20px;
            color: #7f7f7f;
            user-select: none;
            cursor: pointer;
        }

        h4{
            margin-top: 0;
            margin-bottom: 10px;

            font-size: 13px;
            letter-spacing: 1.04px;
        }

        .platform{
            font-size: 13px;

            &.purple{
                color: #8a2be0;
            }
            &.blue{
                color: #4469e1;
            }
            &.lightblue{
                color: #00abdf;
            }
            &.cyan{
                color: #1db6bd;
            }
        }

        .persons{
            display: flex;
            align-items: center;

            .person{
                background: url('/images/uploadImg.png') no-repeat center center;
                background-size: contain;
            }

            & > *{
                height: 30px;
                width: 30px;
                border: 1px solid #ccc;
                border-radius: 50%;
                margin-right: 10px;

                text-align: center;
                font-size: 24px;
                line-height: 29px;
                color: #ddd;

                &:last-of-type{
                    border-color: #ddd;
                    cursor: pointer;
                }
            }
        }

        .bell-line{
            display: flex;
            align-items: center;
            height: 40px;

            .bell{
                margin-left: 5px;
                margin-right: 5px;
                height: 20px;
                width: 20px;
                background: url('/images/bell.png') no-repeat center center;
                background-size: 14px auto;
            }

            .dot{
                height: 5px;
                width: 5px;
                border: 2px solid #ababab;
                border-radius: 50%;
                margin-left: 2px;
            }
        }

        .ddtw{
            position: absolute;
            bottom: 10px;
            right: 20px;

            font-weight: 600;
            font-size: 12px;
            color: #989898;
        }
    }

    .module{
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        position: relative;
        min-height: 250px;
        margin-top: 30px;
        padding: 30px;
        background-color: #f2f2f2;

        .dropdown{
            position: absolute;
            top: 5px;
            right: 20px;
            font-size: 24px;

            button{
                padding: 0;
                border: none;
                background: none;
                outline: none;
                cursor: pointer;
            }

            .menu{
                display: none;
                position: absolute;
                top: 30px;
                right: 0;
                min-width: 70px;
                background: #fff;
                border: 1px solid rgba(34,36,38,.15);
                border-radius: 5px;

                .item {
                    padding-left: 10px;
                    width: 100%;
                    line-height: 28px;
                    font-size: 14px;
                    /* font-weight: 600; */
                    color: rgba(0,0,0,.43);
                    text-transform: uppercase;
                    cursor: pointer;

                    &:hover{
                        background: rgba(0,0,0,.05);
                        font-weight: 600;
                        color: #666;
                    }
                }

                &:hover{
                    display: block;
                }
            }

            .trigger{
                color: #666;
                outline: none;
                cursor: pointer;

                &:focus+.menu{
                    display: block;
                }
            }
        }

        h4{
            max-width: 80%;
            color: #666;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 600;
        }

        p{
            color: #666;
            font-weight: 600;
            font-size: 14px;
        }

        .subline{
            display: flex;
            align-items: center;
            margin-top: 5px;
            margin-bottom: 5px;

            img{
                margin-right: 10px;
            }

            span{
                text-transform: uppercase;
                color: #989898;
                font-weight: 600;
            }
        }

        .addButt{
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            text-align: center;

            .plus{
                height: 50px;
                width: 50px;

                font-size: 36px;
                font-weight: 100;
                color: #b7b7b7;
                line-height: 39px;
                border: 2px solid #b7b7b7;
                border-radius: 50%;
                cursor: pointer;
            }

            .add{
                margin-top: 15px;
                text-transform: uppercase;
                font-size: 12px;
                font-weight: bold;
                color: #bbb;
            }
        }
    }
        
    {/*@media (max-width: 1920px) {
        max-width: 1230px;
        ${props => props.indentTop ? `margin-top: 80px` : ``};
    }
    
    @media (max-width: 991px) {
        max-width: 100%;
        ${props => props.indentBot ? `margin-bottom: 100px` : ``};
    }
    
    @media (min-width: 768px) {
        padding: 0 20px;
    }*/}
`;
