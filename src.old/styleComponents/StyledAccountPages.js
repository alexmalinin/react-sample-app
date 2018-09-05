import styled from "styled-components";

export default styled.div`
  color: #666;
  font-size: 16px;
  letter-spacing: 1.2px;
  width: 100%;
  /* max-width: 1280px; */

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

  .sectionColumn {
    padding: 0 !important;
  }

  .sectionSummury {
    font-size: 16px;
    font-style: italic;
    font-weight: bold;
    border-top: 1px solid #f2f2f2;
  }

  .statementLinks {
    display: flex !important;
    justify-content: space-between;
  }

  .statementLinks.bottom {
    padding-top: 25px;
  }

  .statementLink {
    width: 70px;
    height: 70px;
    border: 1px solid #ccc;
    text-transform: uppercase;
    color: #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  .statementLink:hover {
    color: #666;
    border: 1px solid #666;
  }
`;
