import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { styles } from './Button.styles';
import { disabledButton } from 'src/theme';

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
}

export const Button = ({
  title,
  children,
  handleButton,
  styles,
  disabled,
  type = 'button',
  buttonType = 'primary'
}: InputProps) => {
  return (
    <ButtonStyled
      disabled={disabled}
      buttonType={buttonType}
      style={{ ...styles, ...(disabled ? { backgroundColor: disabledButton } : {}) }}
      onClick={handleButton}
      type={type}
    >
      {children}
      {title}
    </ButtonStyled>
  );
};
