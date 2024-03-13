import { useState } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

// styles
import { defaultStyles } from "@/src/constants/Styles";
import { MonoText } from "@/src/components/StyledText";
import { COLORS } from "@/src/constants/Colors";
import { Stack } from "expo-router";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });
      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <MonoText style={styles.title}>taste map</MonoText>
      <ActivityIndicator
        animating={loading}
        size="large"
        color={COLORS.honey}
      />
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="simon@galaxies.dev"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={defaultStyles.inputField}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={defaultStyles.inputField}
          />

          <Button
            onPress={onSignUpPress}
            title="Sign up"
            color={"#6c47ff"}
          ></Button>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              style={defaultStyles.inputField}
              onChangeText={setCode}
            />
          </View>
          <Button
            onPress={onPressVerify}
            title="Verify Email"
            color={COLORS.clean}
          ></Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.cerulean,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Register;
