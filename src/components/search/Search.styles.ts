import { textColors } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  Container: css`
    display: flex;
    flex-direction: row;
    padding: 4px;
    width: 100%;
    border-bottom: 1px solid #ced4da;
    align-items: center;
    max-width: 700px;
  `,
  input: css`
    padding-left: 8px;
    color: ${textColors.textColor};
    letter-spacing: 0.16px;
    font-size: 14px;
    border: none;
    background-color: transparent;
    width: 100%;

    &:focus {
      outline: none;
    }
  `
};
