import styled from 'styled-components'

export default styled.div`
    
    font-size: 28px;
    
    & > p {
        margin-bottom: 90px;
    }
    
    h2 {
        font-size: 28px;
    }
    
    .ui.input {
        width: 50%;
    }
    
    .two.column {
        margin-bottom: 90px;
    }
    
    .text-area-group {
        position: relative;
        
        p {
            margin: 0;
            border: 2px solid #ccc;
            border-bottom: none;
            padding: 15px;
        }
    }
    
    .flex-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
    .contact {
        border-top: 7px solid #1991fa;
        padding: 20px 0;
        margin: 50px 0;
        width: 30%;
        
        p:last-child {
            font-size:24px;
        }
    }
    
    @media (max-width: 1920px) {
    
        font-size: 14px;
        
        & > p {
            margin-bottom: 60px;
        }
        
        h2 {
            font-size: 20px;
        }
        
        .two.column {
            margin-bottom: 60px;
        }
        
        .text-area-group {
            p {
                border: 1px solid #ccc;
                border-bottom: none;
            }   
        }
        
         .contact {
            border-top: 3px solid #1991fa;
            padding: 20px 0;
            margin: 50px 0;
            
             p:last-child {
                font-size: 14px;
            }
        }
    }
    
    @media (max-width: 767px) {
    
        .ui.input {
            width: 100%;
        }
        
        .contact {
            padding: 15px 0;
            margin: 25px 0 15px;
            width: 100%
        }
        
        .flex-wrapper {
            display: flex;
            flex-direction: column;
        }
    }
`;
