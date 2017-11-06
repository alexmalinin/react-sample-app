import styled from 'styled-components'

export default styled.div`

    textarea {
        border: 2px solid #ccc;
        width: 100%;
        min-height: 360px;
        resize: vertical;
        padding: 15px;
        outline: none;
        margin-bottom: 40px;
    }
    
    @media (max-width: 1920px) {   
            
        textarea {
            border: 1px solid #ccc;
            min-height: 160px;
            margin-bottom: 30px
        }
    }
`;
