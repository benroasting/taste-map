import React from "react";
import { COLORS } from "@/src/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps,
} from "react-hook-form";

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  defaultValue?: string;
}

const ControlledInput = (props: TextInputProps) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const { name, rules, defaultValue, ...inputProps } = props;
  const { field } = useController({ name, rules, defaultValue });

  return (
    <View>
      <RNTextInput
        style={styles.input}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...inputProps}
      />
    </View>
  );
};

const TextInput = (props: TextInputProps) => {
  const { name } = props;
  const formContext = useFormContext();

  if (!formContext || !name) {
    return null;
  }
  return <ControlledInput {...props} />;
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
