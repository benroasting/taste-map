import { Pressable, StyleSheet } from "react-native";

import { View } from "@/src/components/Themed";
import { MonoText } from "@/src/components/StyledText";
import { COLORS } from "@/src/constants/Colors";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Home() {
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>taste map</MonoText>
      <View
        style={styles.separator}
        lightColor={COLORS.morningSky}
        darkColor="rgba(255,255,255,0.1)"
      />
      <Link href="/(modals)/susi" asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="bars"
              title="Info"
              size={25}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
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
