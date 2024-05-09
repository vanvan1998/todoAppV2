import { css } from 'styled-components';
import { textColors, white } from 'src/theme';

export const styles = {
  container: css<{ isMobile: boolean }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
    width: 100%;
    max-width: 1000px;
    align-items: center;
  `,
  errorWrapper: css<{ isMobile: boolean }>`
    display: flex;
    justify-content: flex-start;
    ${({ isMobile }) => (isMobile ? `max-width: 320px; min-width: 200px; width: 80vw` : `min-width: 320px`)};
  `,
  headerWrapper: css<{ isMobile: boolean }>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    justify-content: space-between;
    align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
    gap: 20px;
    padding-bottom: 16px;
    width: 100%;
  `,
  titleWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  `
};
