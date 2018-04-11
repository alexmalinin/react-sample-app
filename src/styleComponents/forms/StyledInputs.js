import styled from 'styled-components';

export default styled.div`
    
    border-radius: 0 !important;
    position: relative;
    margin-bottom: ${props => props.small ? `7px` : `20px`};
    padding-top: 20px;

    ${props => props.padded ? `padding-left: 20px; padding-right: 20px; ` : ``};
    ${props => props.small ? `display: inline-block; margin: 20px 40px 0 20px;` : ``}

    label {
        position: absolute;
        top: 0;
        left: ${props => props.accountInput? `0` : props.padded ? `30px` : `10px`};
        font-family: 'Brix';
        font-size:  ${props => props.accountInput? `10px` : `12px`};
        text-transform: uppercase;
        color:  ${props => props.accountInput? `#999` : `#666`};
        font-weight:  ${props => props.accountInput? `normal` : `600`};
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
        ${props => props.small ? `width: 200px;` : ``}
    }

    .Select-placeholder,
    .Select-value {
        color: ${props => props.accountInput? `#666` : `#ccc !important`};
        padding-left:  ${props => props.accountInput? `0px` : `10px`};
        text-transform: none;
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