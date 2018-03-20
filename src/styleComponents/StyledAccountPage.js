import styled from 'styled-components';

export default styled.div`
    color: #666;
    font-size: 16px;
    letter-spacing: 1.2px;

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
        padding-top: 14px;
        padding-bottom: 2px;
    }

    .sectionTitle {
        font-size: 10px;
        text-transform: uppercase;
        color: #999;
    }

    .sectionContent {
        line-height: 15px;
        
    }

    .sectionSummury {
        font-size: 16px;
        font-style: italic;
        font-weight: bold;
        border-top: 1px solid #f2f2f2;
    }
`