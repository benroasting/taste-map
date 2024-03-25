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
} from "react-native";
import { useRouter } from "expo-router";
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

// for production need to connect to google cloud platform and add credentials
// walkthrough (1:07:16) - airbnb clone with react native - simon grimm youtube

const Susi = () => {
  useWarmUpBrowser();
  const router = useRouter();

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

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [successfulReset, setSuccessfulReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [intendToRegister, setIntendToRegister] = useState(false);
  const [intendToReset, setIntendToReset] = useState(false);

  const onRegisterPress = () => {
    setIntendToRegister(true);
  };

  const onResetPress = () => {
    setIntendToReset(true);
  };

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
  });

  const Login = () => {
    return (
      <>
        {!intendToReset && (
          <>
            <TextInput
              placeholder="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={[defaultStyles.inputField]}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={[defaultStyles.inputField]}
              secureTextEntry
            />
            <TouchableOpacity
              style={[defaultStyles.button]}
              onPress={onSignInPress}
            >
              <Text style={defaultStyles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onRegisterPress} style={styles.links}>
              <Text style={styles.links}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onResetPress} style={styles.links}>
              <Text style={styles.links}>Reset Password</Text>
            </TouchableOpacity>

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
          </>
        )}
      </>
    );
  };

  const Register = () => {
    return (
      <>
        {!pendingVerification && (
          <>
            <TextInput
              autoCapitalize="none"
              placeholder="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={[defaultStyles.inputField]}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[defaultStyles.inputField]}
            />
            <View>
              <Pressable style={[defaultStyles.button]} onPress={onSignUpPress}>
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
                style={[defaultStyles.inputField]}
                onChangeText={setCode}
              />
            </View>
            <Pressable style={defaultStyles.buttonOutline} onPress={onVerify}>
              <Text style={defaultStyles.buttonOutlineText}>Verify Email</Text>
            </Pressable>
          </>
        )}
      </>
    );
  };

  const Reset = () => {
    return (
      <>
        {!successfulReset && (
          <>
            <TextInput
              autoCapitalize="none"
              placeholder="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={[defaultStyles.inputField]}
            />
            <Pressable style={[defaultStyles.button]} onPress={onRequestReset}>
              <Text style={defaultStyles.buttonText}>Send Reset Email</Text>
            </Pressable>
          </>
        )}

        {successfulReset && (
          <>
            <TextInput
              value={code}
              placeholder="Code..."
              style={[defaultStyles.inputField]}
              onChangeText={setCode}
            />
            <TextInput
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[defaultStyles.inputField]}
            />
            <Pressable
              style={[defaultStyles.button, { marginBottom: 10 }]}
              onPress={onReset}
            >
              <Text style={defaultStyles.buttonText}>Set New Password</Text>
            </Pressable>
          </>
        )}
      </>
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

  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulReset(true);
    } catch (error: any) {
      alert(error.error[0].message);
    }
  };

  const onReset = async () => {
    if (!isSignInLoaded) {
      return;
    }
    setLoading(true);
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      alert("Password reset successfully");
      await setActiveSI({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>taste map</MonoText>
      <ActivityIndicator
        animating={loading}
        size="large"
        color={COLORS.honey}
        style={{ marginBottom: 20 }}
      />
      {intendToRegister ? <Register /> : <Login />}
      {intendToReset && <Reset />}
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
