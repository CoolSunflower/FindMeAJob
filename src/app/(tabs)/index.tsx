import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CompanyCard from "../../components/CompanyCard";
import JobCardCompact from "../../components/JobCardCompact";
import JobCardFeatured from "../../components/JobCardFeatured";
import StatCard from "../../components/StatCard";
import { useJobs } from "../../context/JobContext";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { stats, companies, getFeaturedJobs, getCompanyById, getLatestJobs } =
    useJobs();

  const featuredJobs = getFeaturedJobs();
  const latestJobs = getLatestJobs();

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (featuredJobs.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % featuredJobs.length;

      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, featuredJobs.length]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>FindMeAJob</Text>
      <Text style={styles.subtitle}>Discover your next opportunity</Text>

      <View style={styles.statsRow}>
        <StatCard label="Jobs" value={stats.totalJobs} />
        <StatCard label="Companies" value={stats.totalCompanies} />
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Saved" value={stats.savedJobs} />
        <StatCard label="Featured" value={stats.featuredJobs} />
      </View>

      <Text style={styles.heading}>Featured Jobs</Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {featuredJobs.map((job) => (
          <View key={job.id} style={styles.slide}>
            <JobCardFeatured
              job={job}
              companyName={getCompanyById(job.companyId)?.name ?? ""}
              onPress={() => router.push(`/job/${job.id}`)}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {featuredJobs.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>

      <Text style={styles.heading}>Latest Openings</Text>

      <FlatList
        data={latestJobs}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.jobGridItem}>
            <JobCardCompact
              job={item}
              companyName={getCompanyById(item.companyId)?.name ?? ""}
              onPress={() => router.push(`/job/${item.id}`)}
            />
          </View>
        )}
      />

      <Text style={styles.heading}>Top Companies</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onPress={() => router.push(`/company/${company.id}`)}
          />
        ))}
      </ScrollView>
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
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 4,
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  slide: {
    width,
    paddingRight: 32,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#2563EB",
  },

  row: {
    justifyContent: "space-between",
  },

  jobGridItem: {
    width: "48%",
  },
});
