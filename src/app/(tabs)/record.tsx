import { StyleSheet, Button, ScrollView } from "react-native";

import { Text, View } from "@/src/components/Themed";
import TextInput from "@/src/components/form/TextInput";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { COLORS } from "@/src/constants/Colors";

type FormValues = {};

export default function Record() {
  const { ...methods } = useForm();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log({ data });

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Record</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
      <ScrollView style={styles.scrollContainer}>
        <FormProvider {...methods}>
          <TextInput
            name="coffeeName"
            label="Coffee/Blend Name"
            placeholder="Enter coffee name"
            rules={{ required: "Please provide a coffee name" }}
          />
          <TextInput
            name="origin"
            label="Origin"
            placeholder="Enter the country your coffee is from"
            rules={{ required: "Please provide the country" }}
          />
          <TextInput
            name="region"
            label="Region"
            placeholder="What region is it from?"
          />
          <TextInput
            name="farm"
            label="Farm/Mill"
            placeholder="What was the name of the farm, coop, or mill?"
          />
          <TextInput
            name="altitude"
            label="Altitude"
            placeholder="What altitude was your coffee grown at?"
          />
          <TextInput
            name="process"
            label="Process"
            placeholder="Processing method"
          />
          <TextInput
            name="roastLevel"
            label="Roast Level"
            placeholder="How dark was the roast?"
          />
          {/* Change this to a dropdown with options */}
          <TextInput
            name="tastingNotes"
            label="Tasting Notes"
            placeholder="What flavors did you taste?"
          />
        </FormProvider>
        <View>
          <Button
            title="Log Your Coffee"
            color={COLORS.salmon}
            onPress={methods.handleSubmit(onSubmit, onError)}
          />
        </View>
      </ScrollView>
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
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
  scrollContainer: {
    width: "100%",
    padding: 20,
  },
});
