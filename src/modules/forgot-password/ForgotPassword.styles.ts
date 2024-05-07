import { css } from 'styled-components';
import { textColors, white } from 'src/theme';

export const styles = {
  container: css<{ isMobile: boolean }>`
    display: flex;
    flex-direction: column;
    ${({ isMobile }) =>
      isMobile ? 'width: 100%; height: 100vh' : `min-height: 560px; min-width: 400px; margin-top: 40px;`};
    padding: 16px;
    background-color: ${white};
    align-items: center;
    justify-content: center;
    border-radius: 16px;
  `,
  linkWrapper: css`
    color: ${textColors.textColor};
    letter-spacing: 0.16px;
    font-size: 12px;
    margin-top: 8px;
  `,
  errorWrapper: css<{ isMobile: boolean }>`
    display: flex;
    justify-content: flex-start;
    ${({ isMobile }) => (isMobile ? `max-width: 320px; min-width: 200px; width: 80vw` : `min-width: 320px`)};
  `,
  subHeader: css`
    max-width: 290px;
  `
};
