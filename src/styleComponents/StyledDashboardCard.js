import styled from 'styled-components';

export default styled.div`
    
    position: relative;
    padding: 12px 20px 20px 20px;
    padding-right: 40px;
    /* margin-top: 20px;
    margin-bottom: 20px; */
    /* background-color: ${props => props.background || `#f2f2f2` } ; */
    background: ${props => props.backgroundImg ? `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${props.backgroundImg})` : props.background || `#f2f2f2` };
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
    .title {
        margin-bottom: 3px;
    }

    .subTitle {
        color: ${props => props.subtitleColor };
        margin-bottom: 5px;
    }

    .progress {
        display: flex;
        justify-content: flex-end;
    }

    .progressItem {
        position: relative;
        width: 55px;
        height: 55px;
        margin-left: 10px;
        margin-bottom: 20px;
        padding-top: 16px;
        border: 2px solid #ccc;
        border-radius: 50%;
        font-size: 15px;
        color: #ccc;
        text-align: center;
    }

    .progressItem:hover {
        border: 2px solid #666;
        color: #666;
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

    .team::after {
        content: '+';
        line-height: 15px;
        text-align: center;
        position: absolute;
        width: 21px;
        height: 21px;
        right: -21px;
        bottom: 0;
        color: #ccc;
        border: 2px solid #ccc;
        border-radius: 50%;
    }

    .user {
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
        padding-left: 25px;

        p:first-of-type {
            margin-right: 5px;
            margin-bottom: 5px;
        }

        &:last-of-type {
            p:first-of-type {
                margin-right: 0;
            }
        }

        &::before {
            content: '';
            position: absolute;
            width: 13px;
            height: 13px;
            top: 2px;
            left: 0;
            background-image: url('../../images/bell.png');
        }

        &:first-of-type::before {
            background-image: url('../../images/clock.png');
        }

        &:last-of-type::before {
            background-image: url('../../images/calendar.png');
        }
    }

`