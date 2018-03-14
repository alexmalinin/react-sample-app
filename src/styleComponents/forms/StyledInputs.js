import styled from 'styled-components';

export default styled.div`
    
    border-radius: 0 !important;
    position: relative;
    margin-bottom: 30px;
    position: relative;

    label {
        position: absolute;
        top: -18px;
        left: 8px;
        font-size: 12px;
        text-transform: uppercase;
        color: #666;
        font-weight: bold;
    }

    .ui.input {
        width: 100%;        
    }

    .Select-placeholder {
        color: #ccc;
        text-transform: uppercase;
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
    
    @media(max-width: 1920px) {
         .ui.input {
                input {
                    padding-top: 6px;
                    border: 0;
                    border-bottom: 2px solid #f2f2f2;
                    font-size: 16px;
                    color: #666;
                    letter-spacing: 1.5px;
                    padding-left: 7px;
                }
            }
        }
    }
`;