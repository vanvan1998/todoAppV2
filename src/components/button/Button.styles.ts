import { primaryButton } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  button: css`
    min-height: 40px;
    min-width: 320px;
    border-radius: 6px;
    background-color: ${primaryButton};
    border: none;
    color: white;
    letter-spacing: 0.16px;
    font-size: 14px;

    &:hover {
      background-color: #4438c9;
    }
  `
};
