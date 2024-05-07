import React from 'react';
import styled from 'styled-components';
import { styles } from './Input.styles';
import { Title } from 'src/theme';

const InputStyled = styled.input`
  ${styles.input}
`;

interface InputProps {
  title: string;
  value: string;
  onChange: Function;
  styles?: any;
  inputType?: string;
  inputStyles?: any;
  titleStyles?: any;
  placeholder?: string;
}

export const Input = ({
  title,
  value,
  onChange,
  styles,
  inputType = 'text',
  inputStyles,
  placeholder,
  titleStyles
}: InputProps) => {
  return (
    <div style={styles}>
      {title ? <Title style={titleStyles}>{title}</Title> : <></>}
      <InputStyled
        type={inputType}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={inputStyles}
        placeholder={placeholder}
      />
    </div>
  );
};
