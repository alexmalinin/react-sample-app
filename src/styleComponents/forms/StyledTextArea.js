import styled from 'styled-components'

export const StyledTextArea = styled.div`

    p {
        font-size: 12px;
        text-transform: uppercase;
        color: #666;
        font-weight: bold;
        word-spacing: 1.5px;
        padding-left: 7px;
    }

    textarea {
        border: 2px solid #f2f2f2;
        width: 100%;
        min-height: 360px;
        font-size: 16px;
        letter-spacing: 1.5px;
        color: #666;
        resize: vertical;
        padding: 15px;
        outline: none;
        margin-bottom: 0;
    }
    
    @media (max-width: 1920px) {   
            
        textarea {
            border: 2px solid #f2f2f2;
            min-height: 160px;
            margin-bottom: 0;
        }
    }
`;

export const StyledLabelArea = styled.label`
    position:relative;
    
    span {
        top: -40px;
    }
`;
