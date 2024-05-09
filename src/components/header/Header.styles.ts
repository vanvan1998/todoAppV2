import { css } from 'styled-components';

export const styles = {
  container: css`
    border-bottom: 3px solid #ced4da;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 16px 10px 16px;
  `,
  leftHeader: css`
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
  leftMenu: css`
    position: absolute;
    top: 38px;
    right: 10px;
    border-radius: 4px;
    padding: 8px;
    background-color: white;
    width: 190px;
  `,
  accountTitle: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    text-decoration: none;
  `
};
