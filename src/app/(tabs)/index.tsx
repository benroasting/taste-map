import { StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";
import { MonoText } from "@/src/components/StyledText";
import { COLORS } from "@/src/constants/Colors";

export default function Home() {
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>taste map</MonoText>
      <View
        style={styles.separator}
        lightColor={COLORS.morningSky}
        darkColor="rgba(255,255,255,0.1)"
      />
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
