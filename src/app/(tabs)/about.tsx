import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useJobs } from "../../context/JobContext";

export default function AboutScreen() {
  const { jobs, companies } = useJobs();

  const targetJobs = jobs.length;
  const targetCompanies = companies.length;

  const [progress, setProgress] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let frameId: number;
      const duration = 1200;
      const start = performance.now();

      const animate = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setProgress(p);
        if (p < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };

      setProgress(0);
      frameId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(frameId);
    }, [targetJobs, targetCompanies]),
  );

  const jobCount = Math.floor(targetJobs * progress);
  const companyCount = Math.floor(targetCompanies * progress);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.appName}>FindMeAJob</Text>

      <View style={styles.counterCard}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.counterValue}>{jobCount}</Text>
          <Text style={styles.counterLabel}>Jobs Available</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.counterValue}>{companyCount}</Text>
          <Text style={styles.counterLabel}>Companies</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>About Application</Text>

      <Text style={styles.description}>
        FindMeAJob helps job seekers discover and explore career opportunities
        from multiple companies through an intuitive mobile experience.
      </Text>

      <Text style={styles.description}>
        Currently hosting {targetJobs} jobs across {targetCompanies} companies.
      </Text>

      <Text style={styles.sectionTitle}>Features</Text>
      <Text>• Featured Jobs</Text>
      <Text>• Latest Openings</Text>
      <Text>• Job Search</Text>
      <Text>• Category Filters</Text>
      <Text>• Saved Jobs</Text>
      <Text>• Company Profiles</Text>

      <Text style={styles.sectionTitle}>Developer</Text>
      <Text style={styles.info}>Name: Adarsh Gupta</Text>
      <Text style={styles.info}>GitHub: CoolSunflower</Text>

      <Text style={styles.info}>
        Built with React Native, Expo Router, Context API, and TypeScript.
      </Text>

      <Text style={styles.footer}>Thank you for using FindMeAJob.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  appName: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },

  counterCard: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  counterValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2563EB",
  },

  counterLabel: {
    color: "#64748B",
    marginTop: 4,
  },

  counterDivider: {
    height: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 12,
  },

  description: {
    lineHeight: 24,
  },

  info: {
    marginBottom: 4,
  },

  footer: {
    textAlign: "center",
    marginTop: 32,
    color: "#64748B",
  },
});
