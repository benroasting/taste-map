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

interface BorderTextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
}

const ControlledInput = (props: BorderTextInputProps) => {
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

const BorderTextInput = (props: BorderTextInputProps) => {
  const { name } = props;
  const formContext = useFormContext();

  if (!formContext || !name) {
    return null;
  }
  return <ControlledInput {...props} />;
};

export default BorderTextInput;

const styles = StyleSheet.create({
  label: {
    color: COLORS.cerulean,
    margin: 5,
    marginLeft: 0,
  },
  container: {
    justifyContent: "center",
    padding: 8,
    borderColor: "white",
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    backgroundColor: COLORS.mist,
    opacity: 0.5,
    borderColor: COLORS.mist,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
