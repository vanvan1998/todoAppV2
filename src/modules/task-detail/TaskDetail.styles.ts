import { css } from 'styled-components';

export const styles = {
  Container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
    width: 100%;
    max-width: 1000px;
  `,
  headerWrapper: css<{ isMobile: boolean }>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    justify-content: space-between;
    align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
    gap: 20px;
    padding-bottom: 24px;
  `,
  actionWrapper: css`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
  `,
  searchWrapper: css`
    padding-left: 16px;
  `,
  itemWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  `,
  contentWrapper: css<{ isMobile: boolean }>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    gap: 16px;
  `,
  noTaskIcon: css`
    width: 300px;
    height: 300px;
  `,
  notFoundWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  todoDetailWrapper: css<{ isMobile: boolean }>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    gap: 16px;
  `
};
