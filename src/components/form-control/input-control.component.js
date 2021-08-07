import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const AddressInput = styled(TextInput)`
  width: 340px;
`;
const PincodeInput = styled(TextInput)`
  width: 168px;
`;

const CityInput = styled(TextInput)`
  width: 160px;
`;

export const InputController = ({
  label = "fdhfd",
  rules,
  name,
  text = true,
  divide = true,
  control,
  readOnly = false,
  defaultValue,
}) => {
  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return !divide ? (
          <AddressInput
            keyboardType={`${text ? "default" : "numeric"}`}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(v) => onChange(v)}
            value={value}
            label={defaultValue ? defaultValue : label}
            editable={!readOnly}
          />
        ) : !text ? (
          <PincodeInput
            keyboardType="numeric"
            mode="outlined"
            label={label}
            value={value}
            onChangeText={(v) => onChange(v)}
            editable={!readOnly}
          />
        ) : (
          <CityInput
            mode="outlined"
            label={label}
            value={value}
            onChangeText={(v) => onChange(v)}
          />
        );
      }}
      name={name}
      rules={rules}
    />
  );
};
