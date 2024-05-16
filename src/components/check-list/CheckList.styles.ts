import { textColors } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  container: css<{ isMobile: boolean }>`
    display: flex;
    ${({ isMobile }) => (isMobile ? '' : 'flex: 0.4;')};
    flex-direction: column;
    width: 100%;
    border: 1px solid #d8e2eb;
    padding: 16px;
    border-radius: 6px;
    background-color: white;
    justify-content: space-between;
  `,
  inputWrapper: css`
    display: flex;
    flex-direction: row;
    gap: 2px;
    border-bottom: 2px solid #eeeeee;
    padding: 12px 0 2px 0;
    justify-content: space-between;
    margin-left: 16px;
    margin-right: 16px;
  `,
  input: css`
    border: none;
    background-color: transparent;
    color: ${textColors.textColor};
    letter-spacing: 0.16px;
    font-size: 14px;
    width: 100%;
    &:focus {
      outline: none;
    }
  `
};
