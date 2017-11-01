import styled from 'styled-components';

export default styled.div`
    display: inline-block;
    
    input {
        opacity: 0;
        height: 0;
        width: 0;
    }
    
    input:checked + div {
        background-color: #1991fa;
        color: #fff;
        cursor: pointer;
    }
    
    label {
        font-family: Roboto;
        font-size: 24px;
        font-weight: 400;
        color: #000;
    }
    
    div {
        display: inline-block;
        border: 2px solid #1991fa;
        padding: 16px 25px;
        border-radius: 25px;
        margin: 0 30px 40px 0;
        cursor: pointer;
    }
    
    @media (max-width: 1920px) {
        label {
            font-size: 18px; 
        }    
        
        div {
            padding: 10px 20px;
            margin: 0px 20px 15px 0;
        }
    }
    
    @media (max-width: 767px) {
        
        label {
            font-size: 16px; 
        }
        
        div {
            margin: 0px 5px 15px 0;
        }
    } 
    
    @media (max-width: 414px) {
        
        label {
            font-size: 14px; 
        }
    }
`;
