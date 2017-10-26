import styled from 'styled-components';

export const StyledMarkdown = styled.div`
    position: relative;
    z-index: 0;
    
    .RichTextEditor {
        border: none;
        margin-bottom: 40px;
        
        .EditorToolbar {
            position: relative;
            border: none;
            padding: 0;
            margin: 0;
            
            .EditorTitle {
                font-size: 28px;
                padding: 16px 25px;
                border: 2px solid #ccc;
                line-height: 1.21428571em;
            }
            
            .button-group {
                position: absolute;
                top: 24px;
                right: 80px;
                margin: 0;
                
                &:last-child {
                    right: 25px;
                }
                
                button {
                    border: none;
                    padding: 0px;
                    height: auto;
                    line-height: 1;
                    border-radius: 0;
                    background: transparent;
                    
                    span {
                        width: 25px;
                        height: 25px;
                        background-size: 25px;
                    }
                    
                    &.IconButton__isActive___2Ey8p {
                        background: none #d8d8d8;
                    }
                }
            }
        }
        
        .RichTextEditor__editor___1QqIU {
            border: 2px solid #ccc;
            border-top: none;
            
            .public-DraftEditor-content {
                min-height: 260px;
            }
        }
    }
    
    @media (max-width: 1920px) {
        .RichTextEditor {
            margin-bottom: 30px;
            
            .EditorToolbar {
                
                .EditorTitle {
                    padding: 8px 10px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                }
                
                .button-group {
                    position: absolute;
                    top: 7px;
                    right: 59px;
                    
                    &:last-child {
                        right: 15px;
                    }
                    
                    button {
                        span {
                            height: 21px;     
                            width: 22px;
                            height: 22px;
                            background-size: 18px;
                        }
                    }
                }
            }
            
            .RichTextEditor__editor___1QqIU {
                border: 1px solid #ccc;
                border-top: none;
                
                .public-DraftEditor-content {
                    min-height: 160px;
                }
            }
        }
    }
    
    @media (max-width: 551px) {
        .RichTextEditor .EditorToolbar .EditorTitle {
            padding-right: 33%;
        }
    }
`;
