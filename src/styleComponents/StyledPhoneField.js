import styled, {css} from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    border: 1px solid #ccc;
    
    & > div {
        margin: 0;
    }
    
    span {
        text-align: center;
        flex: 0 0 20%;
    }
    
    div:nth-child(2) {
        flex: 0 0 22%;
        
        div {
            border-radius: 0;
            border-top: none;
            border-bottom: none;
        }
    }
    
    div:last-child {
        flex: 0 0 57%;
        
        input {
            border-radius: 0;
            border: none;
            padding-right: 10px;
        }
    }
`;