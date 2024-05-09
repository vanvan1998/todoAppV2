import { primaryButton } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  button: css<{ buttonType: string }>`
    min-height: 40px;
    border-radius: 6px;
    background-color: ${({ buttonType }) => (buttonType === 'primary' ? primaryButton : 'transparent')};
    border: ${({ buttonType }) => (buttonType === 'primary' ? 'none' : `1px solid ${primaryButton}`)};
    color: ${({ buttonType }) => (buttonType === 'primary' ? 'white' : primaryButton)};
    letter-spacing: 0.16px;
    font-size: 14px;

    &:hover {
      background-color: ${({ buttonType }) => (buttonType === 'primary' ? '#4438c9' : '#c3c0cb')};
    }
  `
};
