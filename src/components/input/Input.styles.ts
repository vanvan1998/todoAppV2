import { textColors } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  input: css`
    border-radius: 6px;
    padding: 8px 12px;
    border: 1px solid #eeeeee;
    background-color: #ffffff;
    color: ${textColors.textColor};
    letter-spacing: 0.16px;
    font-size: 14px;
    margin-top: 4px;
  `
};
