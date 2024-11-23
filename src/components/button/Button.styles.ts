import { primaryButtonColor } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  button: css<{ buttonType: string }>`
    min-height: 40px;
    border-radius: 6px;
    background-color: ${({ buttonType }) => (buttonType === 'primary' ? primaryButtonColor : 'transparent')};
    border: ${({ buttonType }) => (buttonType === 'primary' ? 'none' : `1px solid ${primaryButtonColor}`)};
    color: ${({ buttonType }) => (buttonType === 'primary' ? 'white' : primaryButtonColor)};
    letter-spacing: 0.16px;
    font-size: 14px;

    &:hover {
      background-color: ${({ buttonType }) => (buttonType === 'primary' ? '#4438c9' : '#c3c0cb')};
    }
  `
};
