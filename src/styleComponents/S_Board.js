import styled from 'styled-components';

export const S_Board = styled.div`

    max-width: 1280px;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    flex-flow: row wrap;
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
        overflow-y: visible;

        &.visible{
            display: flex !important;
        }

        &>section{
            flex: 0 0 31.5%;
            background: none;
            max-height: 100%;
            height: 100%;
            overflow: visible;
            margin: 0;
            padding: 0;
            padding-bottom: 120px;

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
                    border: none;
                }
            }
        }
    }

    .noTasks{
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 80px;
        padding-bottom: 160px;
        text-align: center;
        text-transform: uppercase;
        font-size: 28px;
    }

    .moduleWrapper{
        display: flex;
        flex-flow: row wrap;
        justify-content:space-between;
        width: 100%;

        &::after{
            content: '';
            height: 0;
            flex: 0 0 31.5%;
        }
    }

    .dragItem{
        position: relative;
        padding: 20px 20px 15px 20px;
        box-shadow: 0px 0px 8px 0px #ccc;
        border-radius: 2px;

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
            flex-flow: row wrap;
            align-items: center;
            max-width: 80%;
            font-family: 'Brix';

            & > .person,
                .addPerson{
                position: relative;
                height: 30px;
                width: 30px;
                border: 1px solid #ccc;
                border-radius: 50%;
                margin-right: 7px;
                margin-bottom: 5px;

                font-size: 24px;
                line-height: 24px;
                color: #ddd;
                cursor: pointer;

                a{
                    text-align: center;
                }

                .dropdownTitle{
                    color: #5366e5;
                    text-transform: uppercase;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 1.3px;
                }

                .close{
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    height: 10px;
                    width: 10px;
                    cursor: pointer;

                    &::before,
                    &::after{
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 8px;
                        height: 1px;
                        background: #bbb;
                        transform: rotate(45deg);
                    }
                    &::after{
                        transform: rotate(-45deg);
                    }
                }
            }

            .person{
                a{
                    outline: none;
                    font-size: 18px;
                    text-transform: none;

                    &:hover{
                        opacity: .8;
                    }

                    img{
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }

                .delete{
                    position: absolute;
                    z-index: 1;

                    display: none;
                    flex-flow: column nowrap;

                    top: calc(100% + 5px);
                    left: 0;
                    min-width: 220px;
                    padding: 10px 15px 15px 15px;

                    background: #fff;
                    border-radius: 5px;
                    font-family: 'Brix';
                    white-space: nowrap;
                    text-align: left;
                    box-shadow: 0 0 12px 0 rgba(0,0,0,0.2);
                    cursor: default;

                    &.show{
                        display: flex;
                    }

                    p{
                        margin-bottom: 5px;
                        
                    }

                    .row{
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: flex-start;

                        img{
                            width: 50px;
                            height: 50px;
                            object-fit: cover;
                            border-radius: 50%;
                        }

                        div{
                            display: flex;
                            flex-flow: column nowrap;
                            justify-content: space-between;
                            padding: 0 8px;

                            p{
                                color: #666;
                                font-weight: 500;
                                font-size: 16px;
                                text-transform: none;
                            }

                            button{
                                padding: 3px 7px;

                                color: #fff;
                                font-size: 12px;
                                font-weight: 500;
                                border: none;
                                border-radius: 2px;
                                background: #e8433e;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }

            .addPerson{
                position: relative;
                a{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    color: inherit;
                }

                .dropdown{
                    position: absolute;
                    z-index: 2;
                    display: none;

                    top: calc(100% + 5px);
                    left: 10px;
                    min-width: 230px;

                    border-radius: 3px;
                    background: #fff;
                    box-shadow: 0 0 12px 0 rgba(0,0,0,0.2);

                    &.visible{
                        display: block;
                    }

                    .dropdownTitle{
                        padding: 10px 15px 0 15px;
                        margin-bottom: 0;
                    }
                    
                    .ui.input{
                        width: 100%;
                        padding: 10px 15px;

                        input{
                            display: inline-block;
                            position: relative;
                            height: 100%;
                            width: 100%;
                            z-index: 1;
                            font-size: 12px;

                            &::placeholder{
                                color: #a1a1a1;
                            }

                            &:focus{
                                border-color: #dbdbdb;
                            }
                        }
                    }

                    .dropdown-list{
                        z-index: 2;
                        display: flex;
                        flex-flow: column nowrap;
                        width: 100%;

                        background: #fff;
                        div{
                            position: relative;
                            display: flex;
                            order: 1;
                            align-items: center;
                            padding: 5px 15px;

                            font-family: 'Brix';
                            font-size: 16px;
                            font-weight: 500;
                            color: #666;
                            cursor: pointer;

                            &:hover{
                                background: #f7f7f7;
                            }

                            text-transform: none;

                            img{
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                object-fit: cover;
                                margin-right: 10px;
                            }

                            &.assigned{
                                order: 0;
                                
                                &::before,
                                &::after{
                                    content: '';
                                    position: absolute;
                                    top: 50%;
                                    right: 25px;
                                    width: 6px;
                                    height: 2px;
                                    background: #38ffbf;
                                    transform: rotate(45deg);
                                    transform-origin: 100% 50%;
                                    border-radius: 2px;
                                }
                                &::before{
                                    width: 13px;
                                    transform: rotate(133deg);
                                }
                            }
                        }
                    }
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
