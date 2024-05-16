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
  titleWrapper: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding-bottom: 12px;
    align-items: center;
  `,
  actionWrapper: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding-top: 16px;
  `,
  rightAction: css`
    display: flex;
    flex-direction: row;
    gap: 8px;
  `,
  category: css<{ color: string }>`
    display: flex;
    flex-direction: row;
    gap: 8px;
    color: ${({ color }) => color};
    background-color: ${({ color }) => color}33;
    font-family: inherit;
    letter-spacing: 0.16px;
    font-size: 14px;
    height: 30px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-radius: 8px;
  `,
  notificationWrapper: css<{ color: string }>`
    display: flex;
    flex-direction: row;
    gap: 2px;
    padding-bottom: 10px;
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

    &:focus {
      outline: none;
    }
  `
};
