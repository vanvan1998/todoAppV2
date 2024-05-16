import { css } from 'styled-components';

export const styles = {
  container: css<{ color: string }>`
    display: flex;
    flex-direction: row;
    padding: 10px 0 0 16px;
    width: 100%;
    align-items: flex-end;
    min-height: 34px;
    gap: 8px;
  `,
  wrapper: css<{ color: string }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    padding-right: 16px;
  `
};
