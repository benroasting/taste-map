const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const COLORS = {
  clean: "#A7D2CB",
  morningSky: "#CAE4DB",
  mist: "#7A9D96",
  honey: "#DCAE1D",
  butter: "#F2D388",
  salmon: "#C98474",
  eggplant: "#874C62",
  cerulean: "#00303F",
};

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export { COLORS };
