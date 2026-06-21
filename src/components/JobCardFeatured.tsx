import { Pressable, StyleSheet, Text, View } from "react-native";

import { Job } from "../types/Job";

type Props = {
  job: Job;
  companyName: string;
  onPress: () => void;
};

export default function JobCardFeatured({ job, companyName, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Featured</Text>
      </View>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{companyName}</Text>
      <Text style={styles.info}>{job.location}</Text>
      <Text style={styles.info}>{job.salary}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: "#2563EB",
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeText: {
    fontWeight: "600",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
  },

  company: {
    color: "#DBEAFE",
    marginTop: 6,
  },

  info: {
    color: "#FFFFFF",
    marginTop: 8,
  },
});
