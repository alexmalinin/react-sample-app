import styled from 'styled-components';

export const StyledBar = styled.aside`

    position: fixed;
    z-index: 10;
    display: flex;
    top: 87px;

    width: 240px;
    height: calc(100vh - 87px);

    background-color: white;
    color: #b3b3b3;
    -webkit-box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);
    -moz-box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);
    box-shadow: 0px 0px 24px 0px rgba(204,204,204,1);

    &.left{
        left: 0;
        overflow-y: auto;

        .addProject,
        .projectLink{
            display: inline-block;
            width: 100%;
            user-select: none;
            padding: 5px 0 5px 40px;
            font-size: 16px;
            color: #b3b3b3;
            text-transform: uppercase;
            transition: .2s;

            span{
                display: inline-block;
                position: relative;
                margin-bottom: -1px;
                height: 12px;
                width: 12px;
                border: 1px solid #b3b3b3;
                border-radius: 50%;
                text-align: center;

                &::before,
                &::after{
                    content: '';
                    position: absolute;
                    top: calc(50% - 3px);
                    height: 6px;
                    width: 1px;
                    background-color: #b3b3b3;
                }

                &::after{
                    transform: rotate(90deg);
                }
            }

            &:hover{
                font-weight: bold;
                color: #7f7f7f;
                background-color: #00ffc0;

                span{
                    border-color: #7f7f7f;

                    &::before,
                    &::after{
                        background-color: #7f7f7f;
                    }
                }
            }
        }

        .addProject{
            font-size: 12px;

            &:hover{
                background-color: #f7f7f7;
                font-weight: normal;
            }
        }

        &>.ui.accordion{
            width: 100%;
            user-select: none;
            margin-top: 0;

            &>.title{
                /* 'Projects' title */
                position: relative;
                margin: 10px 20px 0 20px;
                color: #b3b3b3;
                text-transform: uppercase;
                &::after{
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: 0;

                    height: 10px;
                    width: 10px;
                    transform: translateY(-50%) rotate(45deg);

                    border-bottom: 2px solid #cbcbcb;
                    border-left: 2px solid #cbcbcb;

                    opacity: 0;
                    transition: .2s;
                }

                &:hover::after{
                    opacity: 1;
                }

                &.active::after{
                    transform: translateY(-50%) rotate(-45deg);
                    opacity: 1;
                }
            }

            &>.content{
                padding: 0 0 0 20px;

                .ui.accordion{
                    .title{
                        /* each project title */
                        padding-left: 20px;
                        color: #b3b3b3;
                        text-transform: uppercase;
                        transition: .2s;

                        &:hover,
                        &.active{
                            background-color: #00ffc0;
                            font-weight: bold;
                            color: #7f7f7f;
                        }
                    }
                    
                    .content{
                        padding: 0 0 0 20px;

                        ul{
                            margin-left: 10px;

                            a{
                                display: inline-block;
                                width: 100%;
                                color: #b3b3b3;

                                &:hover{
                                    color: #a3a3a3;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    &.right{
        right: 0;

        &>div{
            width: 100%;
            .ui.attached.tabular.menu{
                border: none;

                .item{
                    display: inline-block;
                    width: 50%;

                    border: none;
                    border-bottom: 2px solid #f2f2f2;

                    text-align: center;

                    &:first-of-type{
                        border-right: 2px solid #f2f2f2;
                    }

                    &.active{
                        border-radius: 0px !important;
                        border-bottom: 4px solid #00ffc0;
                    }
                }
            }
            .attached.segment.tab{
                padding: 20px;
                border: none;
                overflow-y: auto;
                max-height: calc(100% - 44px);

                .team-tab-project{
                    margin-bottom: 30px;

                    h4{
                        color: #666;
                        margin-bottom: 0
                    }

                    h5{
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }

                    .persons{
                        display: flex;
                        flex-flow: row wrap;
                        align-items: center;

                        h5{
                            flex-basis: 100%;
                        }

                        .person{
                            flex-basis: 20%;
                            text-align: center;

                            img, 
                            span{
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                border: 1px solid #e5e5e5;
                                border-radius: 50%;
                            }
                            span{
                                text-align: center;
                                font-size: 24px;
                                line-height: 22px;
                                cursor: pointer;
                            }
                        }
                    }
                }

                .activity-tab-item{
                    text-transform: uppercase;
                    margin-bottom: 60px;

                    h4{
                        font-size: 15px;
                        color: #666;
                    }

                    .activity-item{
                        display: flex;
                        flex-flow: row wrap;
                        align-items: center;
                        margin-bottom: 20px;

                        h5{
                            flex-basis: 100%;
                        }

                        .person{
                            flex-basis: 20%;

                            img{
                                height: 30px;
                                width: 30px;
                                border: 1px solid #e5e5e5;
                                border-radius: 50%;
                            }
                        }

                        .text{
                            flex-basis: 80%;
                            font-size: 12px;

                            span:last-of-type{
                                text-transform: none;
                            }
                        }                        
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1790px){
        display: none;
    }
`;
