import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { styles } from './Button.styles';
import { disabledButtonColor } from 'src/theme';

const ButtonStyled = styled.button<{ buttonType: string }>`
  ${styles.button}
`;

interface InputProps {
  title?: string;
  handleButton: MouseEventHandler<HTMLButtonElement>;
  styles?: any;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  children?: React.ReactNode;
  buttonType?: 'primary' | 'secondary';
  testId?: string;
}

export const Button = ({
  title,
  children,
  handleButton,
  styles,
  disabled,
  type = 'button',
  buttonType = 'primary',
  testId
}: InputProps) => {
  return (
    <ButtonStyled
      disabled={disabled}
      buttonType={buttonType}
      style={{ ...styles, ...(disabled ? { backgroundColor: disabledButtonColor } : {}) }}
      onClick={handleButton}
      type={type}
      data-testid={testId}
    >
      {children}
      {title}
    </ButtonStyled>
  );
};
