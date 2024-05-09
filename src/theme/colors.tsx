import styled from 'styled-components';
import { css } from 'styled-components';

export const primaryButton = '#6459e3';
export const disabledButton = '#B6B4B9';

export const textColor = '#323232';
export const textPrimary = '#5a69ea';
export const error = '#ed2f3a';
export const success = '#49ba5d';
export const placeholder = '#858585';
export const secondary = '#6b7185';

export const transparent = '#ffffffff';
export const black = '#000000';
export const white = '#ffffff';
export const backgroundColor = '#eff1f9';

export const textColors = {
  textPrimary,
  secondary,
  textColor,
  placeholder,
  error,
  success
};

export const buttonColors = {
  primaryButton,
  textColor
};

const textStyle = css`
  color: ${textColors.textColor};
  font-family: inherit;
  letter-spacing: 0.16px;
`;

export const Header = styled.div`
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
  color: ${placeholder};
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
  color: ${error};
`;

export const SuccessText = styled.div`
  ${textStyle}
  font-size: 12px;
  line-height: 14px;
  color: ${success};
`;
