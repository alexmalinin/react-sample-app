import styled from 'styled-components';

export default styled.div`
    
    position: relative;
    padding: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: #f2f2f2;
    text-transform: uppercase;
    font-size: 12px;

    &::before{
        content: '...';
        position: absolute;
        top: 5px;
        right: 20px;
        font-size: 20px;
        color: #7f7f7f;
        user-select: none;
        cursor: pointer;
    }

`