// Libs
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { Stack, router, useRouter } from "expo-router";
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";

// Components
import { Separator } from "@/src/components/Separator";

// Styles
import { defaultStyles } from "@/src/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants/Colors";
import { MonoText } from "@/src/components/StyledText";

enum AuthStrategy {
  Google = "oauth_google",
  // Add more strategies here
  // Add more strategies here
}

const Susi = () => {
  useWarmUpBrowser();

  const {
    signIn,
    setActive: setActiveSI,
    isLoaded: isSignInLoaded,
  } = useSignIn();
  const {
    signUp,
    setActive: setActiveSU,
    isLoaded: isSignUpLoaded,
  } = useSignUp();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [intendToRegister, setIntendToRegister] = useState(false);

  const onRegisterPress = () => {
    setIntendToRegister(true);
  };

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
  });

  const Login = () => {
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

        {/* 
      TODO: Add links to register and reset password
      Register and Reset links and/or modals not working */}

        {/* {/* <Pressable onPress={() => router.push("/(public)/register")}>
        <Text style={styles.links}>Create an account</Text>
      </Pressable> */}
        <TouchableOpacity onPress={onRegisterPress} style={styles.links}>
          <Text style={styles.links}>Create an account</Text>
        </TouchableOpacity>
        {/* <Link href={"/(public)/reset"} style={styles.links} asChild>
        <Text>Forgot your password?</Text>
      </Link>  */}

        <Separator text="or" />

        <View>
          <TouchableOpacity
            style={defaultStyles.buttonOutline}
            onPress={() => onSelectAuth(AuthStrategy.Google)}
          >
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

  const Register = () => {
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
              placeholder="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={[defaultStyles.inputField, { marginBottom: 20 }]}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[defaultStyles.inputField, { marginBottom: 20 }]}
            />
            <View>
              <Pressable
                style={[defaultStyles.button, { marginBottom: 10 }]}
                onPress={onSignUpPress}
              >
                <Text style={defaultStyles.buttonText}>Sign Up</Text>
              </Pressable>
              <Pressable
                style={defaultStyles.buttonOutline}
                onPress={() => router.back()}
              >
                <Text style={defaultStyles.buttonOutlineText}>Back to It</Text>
              </Pressable>
            </View>
          </>
        )}

        {pendingVerification && (
          <>
            <View>
              <TextInput
                value={code}
                placeholder="Enter the code from your email"
                style={[defaultStyles.inputField, { marginBottom: 20 }]}
                onChangeText={setCode}
              />
            </View>
            <Pressable style={defaultStyles.buttonOutline} onPress={onVerify}>
              <Text style={defaultStyles.buttonOutlineText}>Verify Email</Text>
            </Pressable>
          </>
        )}
      </View>
    );
  };

  const onSelectAuth = async (strategy: AuthStrategy) => {
    const selectAuth = {
      [AuthStrategy.Google]: googleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const onSignUpPress = async () => {
    if (!isSignUpLoaded) {
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
      await setActiveSU({ session: signUp.createdSessionId });
      setLoading(false);
    }
  };

  const onVerify = async () => {
    if (!isSignUpLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActiveSU({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  const onSignInPress = async () => {
    if (!isSignInLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActiveSI({ session: completeSignIn.createdSessionId });
    } catch (error: any) {
      alert(error.error[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {intendToRegister ? <Register /> : <Login />}
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
    textAlign: "center",
    paddingBottom: 2,
  },
});

export default Susi;
