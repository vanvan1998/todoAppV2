import { css } from 'styled-components';

export const styles = {
  container: css`
    height: 70;
    border-bottom: 2px solid #eaeaea;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 16px;
  `,
  leftHeader: css`
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  `,
  leftMenu: css`
    position: absolute;
    top: 38px;
    right: 10px;
    border-radius: 4px;
    padding: 8px;
    background-color: white;
    width: 150px;
  `,
  accountTitle: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    text-decoration: none;
  `
};