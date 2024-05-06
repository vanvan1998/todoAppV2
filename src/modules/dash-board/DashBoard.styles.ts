import { css } from 'styled-components';

export const styles = {
  Container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 16;
    padding-top: 16;
  `,
  sponsorWrapper: css`
    position: relative;
    background-color: #ffffff;
    border-radius: 4px;
  `,
  sponsor: css`
    align-items: center;
    padding: 8px;
    position: absolute;
  `,
  taglineWrapper: css`
    color: #323232;
    font-family: Roboto-Regular;
    font-size: 14px;
    letter-spacing: 0.16px;
    line-height: 25px;
  `,
  title: css`
    color: #323232;
    font-family: Rubik-Regular;
    font-size: 12px;
    letter-spacing: 0.16px;
    line-height: 16px;
    padding-bottom: 4px;
  `
};
