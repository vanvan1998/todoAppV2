import { textColor } from 'src/theme';
import { css } from 'styled-components';

export const styles = {
  container: css<{ isMobile: boolean }>`
    padding: ${({ isMobile }) => (isMobile ? '16px 16px 24px 16px' : '16px 30px 24px 30px')};
    min-height: 600px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    max-width: 500px;
  `,
  header: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 0 24px 0;
  `,
  line: css`
    margin-top: 16px;
    background-color: #ebecf0;
    width: 100%;
    height: 1px;
  `,
  category: css<{ isMobile: boolean }>`
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-radius: 6px;
    background-color: #ebecf0;
    gap: 14px;
    width: fit-content;
    flex-wrap: wrap;
    margin-bottom: 16px;
    ${({ isMobile }) => isMobile && 'min-width: 294px; max-width: 438px;'}
  `,
  notification: css`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  `,
  dateTimePicker: css`
    display: flex;
    flex-direction: row;
    gap: 14px;
    align-items: center;
    padding-top: 8px;
    max-width: 438px;
  `,
  description: css`
    width: 100%;
    height: 120px;
    padding: 8px 16px;
    border-radius: 6px;
    fontsize: 14px;
    background-color: #eff3f4;
    border: none;
    color: ${textColor};
    max-width: 438px;
    min-width: 294px;
    margin-bottom: 16px;
  `,
  buttonWrapper: css`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: center;
    padding-top: 24px;
  `
};
