import { Text, View, StyleSheet } from "react-native";

type SeparatorProps = {
  text: string;
};

export const Separator = ({ text }: SeparatorProps) => {
  return (
    <View style={styles.separatorView}>
      <View
        style={{
          flex: 1,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text style={styles.separator}>{text}</Text>
      <View
        style={{
          flex: 1,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
