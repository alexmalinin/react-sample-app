import styled from 'styled-components';

export default styled.form`
    
    margin: 50px 0 180px;
    width: 50%;
    
    & > div {
        margin-bottom: 50px;
    }
    
    @media (max-width: 1920px) {
        
        margin: 40px 0 90px;
    
        & > div {
            margin-bottom: 30px;
        }
        
        .ui.input input {
            font-size: 20px;
        }
    }
    
    @media (max-width: 991px) {
    
        width: 75%;
        margin: 30px 0 60px;
    }
    
    @media (max-width: 767px) {
    
        width: 100%;
    }
`;
