import styled from 'styled-components';

export default styled.div`
    
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    position: relative;
    padding: 12px 30px 16px 20px;
    /* margin-top: 20px;
    margin-bottom: 20px; */
    /* background-color: ${props => props.background || `#f2f2f2` } ; */
    background: ${props => props.backgroundImg 
        ? `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${props.backgroundImg})` 
        : props.background 
        || `#f2f2f2` 
    };
    background-size: cover;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    color: ${props => props.titleColor || `#666`};
    grid-row-end: span ${props => props.size.row};
    ${props => props.village ? `grid-column-end: span ${props.size.col}` : ``};

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

    .titleWrapper{
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .title {
            margin-bottom: 3px;
        }

        .subTitle {
            color: ${props => {
                switch(props.type) {
                    case "project":
                        return '#8f1ae5';
                    case "overview":
                        return '#38ffbf'
                    default:
                        return "inherit";
                }
            }};
            margin-bottom: 5px;
        }
    }

    .progress {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .container{
        position: absolute;
    }

    .progressItem {
        position: relative;
        width: 55px;
        height: 55px;
        margin-left: 10px;
        border: 2px solid #4d4d4d;
        border-radius: 50%;
        font-size: 15px;
        color: #4d4d4d;
        font-weight: 500;
        text-align: center;

        &.addModule{
            border-color: #ccc;
            &::after,
            &::before{
                content: '';
                position: absolute;
                height: 25px;
                width: 2px;
                background: #ccc;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            &::after{
                height: 2px;
                width: 25px;
            }
        }
    }

    .progressCount{
        line-height: 52px;
    }

    .button{
        font-size: inherit;
        position: relative;
        color: #ccc;

        .progressItem{
            margin-left: 0;
        }

        &:hover{
            color: #666;
            .progressItem{
                border-color: #666;
                &.addModule{
                    &::after,
                    &::before{
                        background: #666;
                    }
                }
            }
        }
    }

    .progressDescription {
        position: absolute;
        width: auto;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        font-size: 10px;
    }

    .projectContainer {
        display: flex;
        justify-content: space-between;
        ${props => props.type === 'projects' && `
        position: absolute;
        bottom: 10px;
        display: flex;
        justify-content: space-between;
        width: 88%
        `};
    }

    .team {
        display: flex;
        align-items: flex-end;
        margin-bottom: 5px;
        position: relative;
    }

    .person {
        width: 22px;
        height: 22px;
        margin-right: 10px;
        background-image: url('../../images/user.png');
        background-size: cover;
    }

    .day {
        margin-bottom: 15px;
    }

    .dayTitle {
        margin-bottom: 3px;
        text-transform: none;
        font-style: italic;
        color: #bbb;
    }

    .content > div {
        display: flex;
        position: relative;

        ${props => props.type === 'overview' && `
            justify-content: space-between;
            align-items: center;
        `}

        progress{
            position: relative;
            width: 140px;
            height: 16px;
        }

        p:first-of-type {
            margin-right: 5px;
            margin-bottom: 5px;
        }

        &:last-of-type {
            p:first-of-type {
                margin-right: 0;
            }
        }
    }

`