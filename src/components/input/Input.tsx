import React from 'react';
import styled from 'styled-components';
import { styles } from './Input.styles';
import { Title, SubTitle, Header, PlaceholderTitle } from 'src/theme';

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
  placeholder?: string;
}

export const Input = ({ title, value, onChange, styles, inputType = 'text', inputStyles, placeholder }: InputProps) => {
  return (
    <div style={styles}>
      {title ? <Title>{title}</Title> : <></>}
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
