import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import React from "react";
import TextInput from "@/src/components/form/TextInput";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { defaultStyles } from "@/src/constants/Styles";

type FormValues = {};

const Login = () => {
  useWarmUpBrowser();

  const { ...methods } = useForm();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log({ data });

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <TextInput
          name="email"
          placeholder="Email"
          style={[defaultStyles.inputField, { marginBottom: 20 }]}
        />
        <TouchableOpacity style={defaultStyles.button}>
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </FormProvider>
      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View>
        <TouchableOpacity style={defaultStyles.buttonOutline}>
          <Text style={defaultStyles.buttonOutlineText}>
            Continue with Phone
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  separator: {
    fontFamily: "WorkSans",
    color: "black",
  },
});

export default Login;
