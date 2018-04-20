import styled from 'styled-components';

export default styled.div`
    color: #666;
    font-size: 16px;
    letter-spacing: 1.2px;
    font-weight: 500;
    color: #999;

    .ui.grid {
        margin: 0 !important;

        .row{
            padding-top: 10px;
            padding-bottom: 10px;
            .column{
                padding-left: 2px;
                padding-right: 2px;
            }
        }
    }

    .section-header {
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 600;
        border-bottom: 2px solid #00ffc0;
        display: flex;
        justify-content: space-between;
        width: 100%;

        .title{
            margin-top: 28px;
            color: #999;
            letter-spacing: 2px;
        }
    }

    .buttonAdd {
        margin-top: 15px;
        width: 23px;
        height: 23px;
        display: block;
        border: 1px solid #ccc;
        border-radius: 50%;
        position: relative;
    }

   
    .buttonAdd::before,
    .buttonAdd::after {
        content: '';
        width: 15px;
        height: 1px;
        top: 10px;
        left: 3px;
        position: absolute;
        background-color: #ccc;
    }

    .buttonAdd::after {
        transform: rotate(90deg);
    }

    .buttonAdd:hover {
        border: 1px solid #666;
    }

    .team {
        width: 100%;
        font-size: 12px;
        display: flex;
        margin-top: 15px;

        img {
            width: 23px;
            height: 23px;
            margin-right: 20px;
        }
    }
    .teamsPlaceholder{
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        min-height: 460px;

        text-align: center;
        font-size: 3em;
        color: #dbdbdb;
    }

    .channels{
        display: flex;

        .channel{
            display: inline-block;

            width: 210px;
        }

        .addChannel{
            display: inline-block;
            .ui.input{
                input{
                    width: 150px;

                    color: #c3c3c3;
                    font-size: 14px;
                    font-weight: 500;
                    border: none;
                    border-radius: 5px;
                    background: rgba(216, 216, 216, .18);

                    &::placeholder{
                        color: #c3c3c3;
                        font-weight: 500;
                    }
                }
            }
        }

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
                outline: none;
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
    }
`;
