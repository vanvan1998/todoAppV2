import { css } from 'styled-components';

export const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #d8e2eb;
    padding: 16px;
    border-radius: 6px;
    height: 170px;
    background-color: white;
    justify-content: space-between;
  `,
  actionWrapper: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  `,
  rightAction: css`
    display: flex;
    flex-direction: row;
    gap: 8px;
  `,
  notificationWrapper: css<{ color: string }>`
    display: flex;
    flex-direction: row;
    gap: 2px;
    padding-bottom: 4px;
  `
};
