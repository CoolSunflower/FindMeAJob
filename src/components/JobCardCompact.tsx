import { Pressable, StyleSheet, Text, View } from "react-native";
import { Job } from "../types/Job";

type Props = {
  job: Job;
  companyName: string;
  onPress: () => void;
};

export default function JobCardCompact({ job, companyName, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{companyName}</Text>
      <Text style={styles.meta}>{job.location}</Text>
      <View style={styles.row}>
        <Text>{job.salary}</Text>
        <Text>{job.experience}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  company: {
    marginTop: 4,
    color: "#2563EB",
  },

  meta: {
    marginTop: 8,
    color: "#64748B",
  },

  row: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
