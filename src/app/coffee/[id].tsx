import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const CoffeePage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>{id} Coffee</Text>
    </View>
  );
};

export default CoffeePage;
