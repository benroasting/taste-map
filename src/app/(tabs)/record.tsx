import { StyleSheet, Button, ScrollView } from "react-native";

import { Text, View } from "@/src/components/Themed";
import BorderTextInput from "@/src/components/form/BorderTextInput";
import { useForm } from "react-hook-form";
import { CreateRecord } from "../types/CreateRecord"
import { COLORS } from "@/src/constants/Colors";

interface CreateRecordProps {
  onSubmit: (data: CreateRecord) => void;
  isPending: boolean,
  isError: boolean
}

export default function Record({ onSubmit, isPending, isError}: CreateRecordProps) {
  const { register, handleSubmit, formState: {errors} } = useForm<CreateRecord>();


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BorderTextInput
            {...register("coffeeName")}
            label="Coffee/Blend Name"
            placeholder="Enter coffee name"
            rules={{ required: "Please provide a coffee name" }}
          />
          <BorderTextInput
            {...register("origin")}
            label="Origin"
            placeholder="Enter the country your coffee is from"
            rules={{ required: "Please provide the country" }}
          />
          <BorderTextInput
            {...register("region")}
            label="Region"
            placeholder="What region is it from?"
          />
          <BorderTextInput
            {...register("farm")}
            label="Farm/Mill"
            placeholder="What was the name of the farm, coop, or mill?"
          />
          <BorderTextInput
            {...register("altitude")}
            label="Altitude"
            placeholder="What altitude was your coffee grown at?"
          />
          <BorderTextInput
            {...register("process")}
            label="Process"
            placeholder="Processing method"
          />
          <BorderTextInput
            {...register("roastLevel")}
            label="Roast Level"
            placeholder="How dark was the roast?"
          />
          {/* Change this to a dropdown with options */}
          <BorderTextInput
            {...register("tastingNotes")}
            label="Tasting Notes"
            placeholder="What flavors did you taste?"
          />
        <View>
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating Record..." : "Record Your Coffee"}
        </button>
          {/* <Button
          title={isPending ? "Creating Entry..." : "Submit Coffee"}
            color={COLORS.salmon}
          >Submit</Button> */}
        </View>
        </form>
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
