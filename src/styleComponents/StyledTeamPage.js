import styled from 'styled-components';

export default styled.div`
    color: #666;
    font-size: 16px;
    letter-spacing: 1.2px;
    font-weight: 500;
    color: #999;

    .grid {
        margin: 0 !important;
    }

    .section-header {
        font-size: 12px;
        text-transform: uppercase;
        font-weight: bold;
        border-bottom: 2px solid #00ffc0;
        display: flex;
        justify-content: space-between;
        width: 100%;

        .title{
            margin-top: 28px;
        }
    }

    .buttonAdd {
        margin-top: 15px;
        width: 23px;
        height: 23px;
        display: block;
        border: 1px solid #ccc;
        border-radius: 50%;
        position: relative;
    }

   
    .buttonAdd::before,
    .buttonAdd::after {
        content: '';
        width: 15px;
        height: 1px;
        top: 10px;
        left: 3px;
        position: absolute;
        background-color: #ccc;
    }

    .buttonAdd::after {
        transform: rotate(90deg);
    }

    .buttonAdd:hover {
        border: 1px solid #666;
    }

    .team {
        width: 100%;
        font-size: 12px;
        display: flex;
        margin-top: 15px;

        img {
            width: 23px;
            height: 23px;
            margin-right: 20px;
        }
    }

`