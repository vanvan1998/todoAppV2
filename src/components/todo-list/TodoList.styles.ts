import { textColors } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    gap: 12px;
  `,
  count: css<{ color: string }>`
    color: ${({ color }) => (color ? color : textColors.textColor)};
    border-radius: 16px;
    background-color: ${({ color }) => (color ? color : textColors.textColor)}33;
    padding: 0 8px;
    font-weight: 500;
  `
};
