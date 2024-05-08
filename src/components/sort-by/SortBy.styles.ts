import { css } from 'styled-components';

export const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    position: relative;
  `,
  leftMenu: css`
    position: absolute;
    top: 38px;
    left: 0px;
    border-radius: 4px;
    padding: 8px;
    background-color: white;
    width: 150px;
  `,
  sortTitle: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    text-decoration: none;
  `
};
