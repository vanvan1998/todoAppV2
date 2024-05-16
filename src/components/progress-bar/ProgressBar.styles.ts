import { textColors } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  `,
  wrapper: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4px;
  `,
  count: css<{ color: string }>`
    color: ${({ color }) => (color ? color : textColors.textColor)};
    background-color: transparent;
    font-size: 14px;
  `,
  progressBorder: css<{ color: string }>`
    background-color: ${({ color }) => (color ? color : textColors.textColor)}33;
    width: 100%;
    height: 5px;
    border-radius: 4px;
  `,
  progress: css<{ color: string; count: number }>`
    background-color: ${({ color }) => (color ? color : textColors.textColor)};
    width: ${({ count }) => count}%;
    height: 5px;
    border-radius: 4px;
  `
};
