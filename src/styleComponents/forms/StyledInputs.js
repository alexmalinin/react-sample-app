import styled from 'styled-components';

export default styled.div`
    
    border-radius: 0 !important;
    position: relative;
    margin-bottom: 20px;
    padding-top: 20px;

    label {
        position: absolute;
        top: 0;
        left: 10px;
        font-size: 12px;
        text-transform: uppercase;
        color: #666;
        font-weight: bold;
    }

    .ui.input {
        width: 100%;

        input {
            border: none;
            border-bottom: 2px solid #f2f2f2;
            font-size: 16px;
            color: #666;
            letter-spacing: 1.5px;
            padding-left: 10px;
            border-radius: 0;
        }    
    }

    .Select-input {
        height: 41px;
    }

    .Select-placeholder,
    .Select-value {
        color: #ccc !important;
        padding-left: 10px;
        letter-spacing: 1.5px;
        font-size: 16px;
    }

    .Select-value-label {
        color: #ccc !important;
    }    

    @media (min-width: 1921px) {
        
        margin-bottom: 40px;
        
        .ui.input {
           font-size: 28px;
        } 
       
        .Select-control {
           height: 74px;
        }
        
        .Select-placeholder {
           padding: 0 25px;
           line-height: 74px;
           font-size: 28px;
        }
        

       .Select-value {
           font-size: 28px;
           padding-left: 25px !important; //overwrite theme
           
           span {
               line-height: 74px;
           }
       }
    }
    
    /* @media(max-width: 1920px) {
         .ui.input {
                
            }
        }
    } */
`;