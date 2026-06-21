import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useJobs } from "../../context/JobContext";

export default function CompanyDetailsScreen() {
  const { companyId } = useLocalSearchParams<{
    companyId: string;
  }>();

  const { getCompanyById, jobs } = useJobs();

  const company = getCompanyById(companyId);

  if (!company) {
    return (
      <View style={styles.center}>
        <Text>Company not found.</Text>
      </View>
    );
  }

  const openJobs = jobs.filter((job) => job.companyId === company.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.name}>{company.name}</Text>

      <Text style={styles.industry}>{company.industry}</Text>

      <View style={styles.card}>
        <View style={styles.iconRow}>
          <Ionicons name="star" size={16} color="black" />
          <Text>Rating: {company.rating}</Text>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="people" size={16} color="black" />
          <Text>Employees: {company.employeeCount}</Text>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="location" size={16} color="black" />
          <Text>{company.location}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>About Company</Text>

      <Text style={styles.description}>{company.description}</Text>

      <Text style={styles.sectionTitle}>Benefits</Text>

      {company.benefits.map((benefit) => (
        <View key={benefit} style={styles.benefit}>
          <Text>• {benefit}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Open Positions</Text>

      {openJobs.map((job) => (
        <Pressable
          key={job.id}
          style={styles.jobItem}
          onPress={() => router.push(`/job/${job.id}`)}
        >
          <Text style={styles.jobTitle}>{job.title}</Text>

          <View style={styles.iconRow}>
            <Ionicons name="location" size={16} color="black" />
            <Text>{job.location}</Text>
          </View>

          <Text style={styles.viewJob}>View Job →</Text>
        </Pressable>
      ))}
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

  name: {
    fontSize: 28,
    fontWeight: "700",
  },

  industry: {
    marginTop: 4,
    color: "#64748B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 8,
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

  benefit: {
    marginBottom: 8,
  },

  jobItem: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  jobTitle: {
    fontWeight: "600",
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  viewJob: {
    marginTop: 10,
    color: "#2563EB",
    fontWeight: "600",
  },
});
