import styled, {css} from 'styled-components';

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
    }
    
    label {
        font-family: Roboto;
        font-size: 24px;
        font-weight: 400;
        color: #000;
    }
    
    div {
        display: inline-block;
        border: 1px solid #1991fa;
        padding: 5px 20px;
        border-radius: 25px;
    }
    
`;