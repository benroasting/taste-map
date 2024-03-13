import { Button, StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";

import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function Journal() {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Journal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="Log Out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Button title="Login" href={"/(modals)/sui"}>
          <Text>Login</Text>
        </Button>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
