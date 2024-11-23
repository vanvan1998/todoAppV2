import { placeholderColor, successColor, textColors, errorColor } from 'src/theme';
import styled from 'styled-components';
import { css } from 'styled-components';

const textStyle = css`
  color: ${textColors.textColor};
  font-family: inherit;
  letter-spacing: 0.16px;
`;

export const HeaderTitle = styled.div`
  ${textStyle}
  font-size: 32px;
  line-height: 36px;
`;

export const Title = styled.div<{ styles?: string }>`
  ${textStyle}
  font-size: 14px;
  line-height: 16px;
  ${({ styles }) => (styles ? styles : '')}
`;

export const PlaceholderTitle = styled.div`
  ${textStyle}
  font-size: 14px;
  line-height: 16px;
  color: ${placeholderColor};
`;

export const SubTitle = styled.div`
  ${textStyle}
  font-size: 12px;
  line-height: 14px;
`;

export const ErrorText = styled.div`
  ${textStyle}
  font-size: 12px;
  line-height: 14px;
  color: ${errorColor};
`;

export const SuccessText = styled.div`
  ${textStyle}
  font-size: 12px;
  line-height: 14px;
  color: ${successColor};
`;
