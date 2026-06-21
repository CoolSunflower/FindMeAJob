import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import CategoryChip from "../../components/CategoryChip";
import JobCardCompact from "../../components/JobCardCompact";
import SearchBar from "../../components/SearchBar";

import { useJobs } from "../../context/JobContext";

const FILTERS = [
  "All",
  "Saved",
  "Software",
  "Design",
  "Marketing",
  "Sales",
  "HR",
];

export default function JobsScreen() {
  const { jobs, getSavedJobs, getCompanyById, searchJobs } = useJobs();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredJobs = useMemo(() => {
    if (filter === "Saved") {
      return getSavedJobs().filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          getCompanyById(job.companyId)
            ?.name.toLowerCase()
            .includes(query.toLowerCase()),
      );
    }

    return searchJobs(query, filter as any);
  }, [filter, query, jobs]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobs</Text>
      <SearchBar value={query} onChangeText={setQuery} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
      >
        {FILTERS.map((item) => (
          <CategoryChip
            key={item}
            label={item}
            selected={filter === item}
            onPress={() => setFilter(item)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <JobCardCompact
            job={item}
            companyName={getCompanyById(item.companyId)?.name ?? ""}
            onPress={() => router.push(`/job/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No jobs found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  filters: {
    marginBottom: 12,
    maxHeight: 40,
  },

  list: {
    paddingBottom: 40,
    // backgroundColor: "lime",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#64748B",
  },
});
