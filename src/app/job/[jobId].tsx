import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useJobs } from "../../context/JobContext";

export default function JobDetailsScreen() {
  const { jobId } = useLocalSearchParams<{
    jobId: string;
  }>();

  const { getJobById, getCompanyById, isJobSaved, saveJob, unsaveJob } =
    useJobs();

  const job = getJobById(jobId);

  if (!job) {
    return (
      <View style={styles.center}>
        <Text>Job not found.</Text>
      </View>
    );
  }

  const company = getCompanyById(job.companyId);

  const saved = isJobSaved(job.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{job.title}</Text>

      <Text style={styles.company}>{company?.name}</Text>

      <View style={styles.infoCard}>
        <View style={styles.iconRow}>
          <Ionicons name="cash" size={16} color="black" />
          <Text>{job.salary}</Text>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="location" size={16} color="black" />
          <Text>{job.location}</Text>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="code-slash" size={16} color="black" />
          <Text>{job.experience}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>

      <Text style={styles.description}>{job.description}</Text>

      {company && (
        <>
          <Text style={styles.sectionTitle}>Company Information</Text>

          <Pressable
            style={styles.companyCard}
            onPress={() => router.push(`/company/${company.id}`)}
          >
            <Text style={styles.companyName}>{company.name}</Text>
            <Text>{company.industry}</Text>
            <View style={styles.iconRow}>
              <Ionicons name="star" size={16} color="black" />
              <Text>{company.rating}</Text>
            </View>
          </Pressable>
        </>
      )}

      <Pressable
        style={styles.saveButton}
        onPress={() => {
          if (saved) {
            unsaveJob(job.id);
          } else {
            saveJob(job.id);
          }
        }}
      >
        <Text style={styles.buttonText}>
          {saved ? "Remove Saved Job" : "Save Job"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  company: {
    color: "#2563EB",
    marginTop: 6,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
  },

  description: {
    lineHeight: 22,
  },

  companyCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
  },

  companyName: {
    fontWeight: "700",
    marginBottom: 4,
  },

  saveButton: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
