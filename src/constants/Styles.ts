import Colors, { COLORS } from "./Colors";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.light.background,
  },
  button: {
    backgroundColor: COLORS.cerulean,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: COLORS.salmon,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontFamily: "WorkSans",
  },
  buttonOutlineText: {
    color: "black",
    fontSize: 16,
    fontFamily: "WorkSans",
  },
  buttonIcon: {
    position: "absolute",
    left: 16,
  },
});
