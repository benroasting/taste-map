import { Button, Pressable, StyleSheet } from "react-native";

import { View, Text } from "@/src/components/Themed";
import { MonoText } from "@/src/components/StyledText";
import { COLORS } from "@/src/constants/Colors";
import { Link, router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/src/constants/Styles";

export default function Home() {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>taste map</MonoText>
      <View
        style={styles.separator}
        lightColor={COLORS.morningSky}
        darkColor="rgba(255,255,255,0.1)"
      />
      {!isSignedIn && (
        <Link href="/(modals)/susi" asChild>
          <Pressable style={defaultStyles.button}>
            {({ pressed }) => (
              <Text
                style={[
                  defaultStyles.buttonText,
                  {
                    paddingHorizontal: 20,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                Sign In
              </Text>
            )}
          </Pressable>
        </Link>
      )}
      {isSignedIn && (
        <Pressable
          onPress={() => signOut()}
          style={defaultStyles.buttonOutline}
        >
          {({ pressed }) => (
            <Text
              style={[
                defaultStyles.buttonOutlineText,
                {
                  paddingHorizontal: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              Sign Out
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.cerulean,
  },
  separator: {
    marginVertical: 30,
    height: 3,
    width: "80%",
  },
});
