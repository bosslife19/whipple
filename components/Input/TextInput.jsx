import React from 'react';
import { TextInput } from 'react-native';

const CustomInput = ({
  value,
  onChangeText,
  placeholder = 'Enter text',
  keyboardType = 'default',
  style,
  placeholderTextColor = 'gray',
}) => {
  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
    />
  );
};

export default CustomInput;
