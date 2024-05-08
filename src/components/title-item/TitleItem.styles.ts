import { textColors } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  container: css<{ color: string }>`
    display: flex;
    flex-direction: row;
    padding: 4px;
    width: 100%;
    border-bottom: 2px solid ${({ color }) => (color ? color : textColors.textColor)};
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
  `,
  count: css<{ color: string }>`
    color: ${({ color }) => (color ? color : textColors.textColor)};
    border-radius: 16px;
    background-color: ${({ color }) => (color ? color : textColors.textColor)}33;
    padding: 0 8px;
    font-weight: 500;
  `
};
