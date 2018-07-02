import styled from "styled-components";
import { primaryColors, boxShadow, fontColors } from "../constants/colors";

export const ContainerLarge = styled.div`
  margin: 0 auto;
  max-width: ${props => (props.containerHeader ? `94%` : `1280px`)};
  width: 100%;
  transition: 0.4s ease-in-out;

  & > .ui.grid {
    margin: 0;
  }

  ${props => (props.indentBot ? `margin-bottom: 250px` : ``)};

  @media screen and (min-width: 768px) {
    padding: 0;
  }

  @media screen and (max-width: 1920px) {
    max-width: 1910px;
    padding: 0;
  }

  ${props =>
    props.sidebarCondition &&
    `
    @media (min-width: 1441px) {
      max-width: 100%;
      padding-left: 260px;
      padding-right: 60px;
    }

    @media (max-width: 1440px) {
      padding-left: 100px;
      padding-right: 60px;
    }
    `};
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: ${props =>
    props.dashboardContainer
      ? `0 0 80px 0`
      : props.fluid
        ? `0 20px 0 20px`
        : `0px 20px 80px 20px`};
  margin-bottom: 50px;

  max-width: 1280px;
  margin-top: 0;
  background-color: ${props =>
    props.dashboardContainer ? `transparent` : `white`};
  ${props => (props.dashboardContainer ? `` : boxShadow.light)};
  ${props => (props.indentTop ? `margin-top: 100px` : ``)};
  ${props => (props.indentTopXs ? `margin-top: 40px` : ``)};
  ${props => (props.relative ? `position: relative` : ``)};
  transition: 0.4s ease-in-out;

  &.loading {
    .preloader {
      opacity: 1;
      visibility: visible;
    }
    .ui.grid {
      opacity: 0;
      pointer-events: none;
    }
  }

  .preloader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
  }

  & .navigation-wrap {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  & > .default {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    font-size: 30px;
    text-transform: uppercase;
    color: ${fontColors.black};
  }

  @media (max-width: 1920px) {
    max-width: 1280px;
  }

  ${props =>
    props.sidebarCondition &&
    !props.small &&
    `
        @media (min-width: 1441px) {
            max-width: 100%;
        }

        @media (max-width: 1440px) {

        }
    `} @media (max-width: 992px) {
    padding-bottom: 100px;
  }
`;

export const IntroContainer = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  border-radius: 3px;
  padding: 30px 30px 60px 30px;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  align-self: center;
  margin-top: -87px;

  & .confirm-msg {
    font-family: Roboto;
    margin-top: 40px;

    & > p {
      color: #666;
      text-transform: uppercase;
      font-size: 1rem;
      margin-bottom: 10px;
    }

    & > div {
      font-family: Roboto;
      border-bottom: 2px solid #f2f2f2;
      font-size: 1.2rem;
      letter-spacing: 1.5px;
      color: #666;
      padding-bottom: 10px;
    }
  }

  .controls {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 10%;
    margin: 40px auto 0;
  }
`;
