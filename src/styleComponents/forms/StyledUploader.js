import styled, {css} from 'styled-components';

export default styled.label`
    
    input {
        display: none;
    }
    
    & .imgPreview {
        display: inline-block;
        
        & img {
            max-height: 279px;
            max-width: 279px;
        }
    }
    
    & .preloader {
        border: 1px solid #ccc;
        padding: 40px 39px 0px 36px;
        
        img {
            width: 204px;
        }    
    }
`;