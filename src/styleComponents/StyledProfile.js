import styled from "styled-components";
import { colors, primaryColors, fontColors } from "./constants/colors";

export default styled.div`
  font-size: 16px;
  letter-spacing: 1.1px;

  .ui.grid {
    margin-left: 0;
    margin-right: 0;

    .row {
      padding: 0;

      .column {
        padding: 0;

        &:first-of-type {
          padding-right: 20px;
        }
      }
    }
  }

  .profile-image {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
    text-align: center;

    .image-wrapper {
      width: 120px;
      height: 120px;
      background: ${primaryColors.accentBackground};
      overflow: hidden;
      border-radius: 50%;
      border: 0px solid #fff;
      max-width: 291px;
      max-height: 291px;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .edit-btn {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .profile-name {
    font-size: 16px;
    color: ${fontColors.black};
    margin: 10px 0;
  }

  .pfofile-title {
    font-size: 16px;
    font-weight: 500;
    color: ${fontColors.black};
    padding-bottom: 10px;
  }

  .profile-info {
    background-color: #fff;
    padding: 20px 20px 0;
    margin-bottom: 20px;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
  }

  .profile-content {
    border-top: 1px solid ${colors.lightGreyBlue};
    padding: 15px 0;

    .profile-subtitle {
      color: ${fontColors.regular};
      margin-bottom: 10px;
    }

    .profile-block {
      padding-bottom: 10px;

      & > span {
        color: ${fontColors.light};
      }
    }

    .profile-row {
      display: flex;

      .profile-column {
        width: 50%;

        &:first-of-type {
          border-right: 1px solid ${colors.lightGreyBlue};
          margin-right: 15px;
        }
      }
    }
  }

  .profile-item {
    margin-bottom: 15px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .profile-label {
    width: 100%;
    color: ${fontColors.light};
    margin-bottom: 5px;
  }

  .profile-description {
    color: ${fontColors.regular};
  }

  .profile-skills,
  .profile-communications {
    display: flex;
    flex-wrap: wrap;

    & > span {
      font-size: 14px;
      margin: 10px 10px 0 5px;
      padding: 0 15px;
      letter-spacing: 1.2px;
      border-radius: 20px;
    }
  }

  .profile-skills > span {
    color: ${fontColors.blue.inert};
    background-color: ${colors.lightGreyBlue};
  }

  .profile-communications > span {
    color: ${fontColors.light};
    border: 1px solid ${colors.light};
  }
`;
