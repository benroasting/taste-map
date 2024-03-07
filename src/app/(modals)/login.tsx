import TextInput from "@/src/components/form/TextInput";
import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";

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
          label="Email"
          placeholder="Email"
          rules={{ required: "Please provide your email" }}
        />
        <TextInput
          name="password"
          label="Password"
          placeholder="Password"
          rules={{ required: "Please provide your password" }}
        />
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Login;
