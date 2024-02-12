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
  label: string;
  defaultValue?: string;
}

const ControlledInput = (props: TextInputProps) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const { label, name, rules, defaultValue, ...inputProps } = props;
  const { field } = useController({ name, rules, defaultValue });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <RNTextInput
          style={styles.input}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />
      </View>
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
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  container: {
    justifyContent: "center",
    padding: 8,
    backgroundColor: COLORS.butter,
    borderColor: "white",
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
