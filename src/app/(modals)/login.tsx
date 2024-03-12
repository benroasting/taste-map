import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Pressable,
} from "react-native";

// components
import { Separator } from "@/src/components/Separator";

import { defaultStyles } from "@/src/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import { useSignIn } from "@clerk/clerk-expo";
import { COLORS } from "@/src/constants/Colors";
import { Link } from "expo-router";
import { MonoText } from "@/src/components/StyledText";

type FormValues = {};

const Login = () => {
  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error: any) {
      alert(error.error[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>taste map</MonoText>
      <ActivityIndicator
        animating={loading}
        size="large"
        color={COLORS.honey}
      />
      <TextInput
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={[defaultStyles.inputField, { marginBottom: 20 }]}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={[defaultStyles.inputField, { marginBottom: 20 }]}
        secureTextEntry
      />
      <TouchableOpacity
        style={[defaultStyles.button, { marginBottom: 20 }]}
        onPress={onSignInPress}
      >
        <Text style={defaultStyles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Link href="/(modals)/register" asChild>
        <Pressable style={styles.links}>
          <Text>Create an account</Text>
        </Pressable>
      </Link>
      <Link href="/(modals)/reset" asChild>
        <Pressable style={styles.links}>
          <Text>Forgot your password?</Text>
        </Pressable>
      </Link>

      <Separator text="or" />

      <View>
        <TouchableOpacity style={defaultStyles.buttonOutline}>
          <Ionicons
            name="logo-google"
            size={24}
            style={defaultStyles.buttonIcon}
            color="black"
          />
          <Text style={defaultStyles.buttonOutlineText}>
            Continue with Google
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
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.cerulean,
    textAlign: "center",
    marginBottom: 20,
  },
  links: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 2,
  },
});

export default Login;
