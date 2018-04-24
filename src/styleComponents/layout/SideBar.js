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
        display: flex;
        flex-flow: column nowrap;

        .title{
            padding: 10px 0;
            text-align: center;
            text-transform: uppercase;
            border-bottom: 1px solid #f2f2f2;

            h4{
                font-size: 12px;
                font-weight: 500;
            }
        }

        .projects{
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            width: 80px;
            background: #f2f2f2;

            .projectLink{
                border-radius: 50%;
                border: 1px solid #ccc;
                margin: 5px 0;
                overflow: hidden;
                height: 60px;
                width: 60px;

                img{
                    height: 100%;
                    width: 100%;
                }
                .projectUnLogo{
                    display: inline-block;
                    height: 60px;
                    width: 60px;
                    font-size: 48px;
                    font-weight: 600;
                    text-transform: uppercase;
                    line-height: 56px;
                    letter-spacing: 1px;
                    text-align: center;
                    background: linear-gradient(to bottom right, #2d68ee 0%,#7439e3 100%);
                    color: #fff;
                }
            }

            .projectName{
                position: absolute;
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
                    font-size: 14px;
                    color: #b3b3b3;

                    border: none;
                    border-bottom: 2px solid #f2f2f2;

                    text-align: center;

                    &:first-of-type{
                        border-right: 2px solid #f2f2f2;
                    }

                    &.active{
                        color: #666;
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
        width: 190px;
    }

    @media screen and (max-width: 1290px){
        display: none;
    }
`;
