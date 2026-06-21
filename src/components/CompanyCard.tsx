import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { Company } from "../types/Company";

type Props = {
  company: Company;
  onPress: () => void;
};

export default function CompanyCard({ company, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{company.name}</Text>
      <Text style={styles.industry}>{company.industry}</Text>
      <Text style={styles.rating}>
        <Ionicons name="star" size={16} color="#FBBF24" /> {company.rating}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },

  name: {
    fontWeight: "700",
    fontSize: 16,
  },

  industry: {
    marginTop: 4,
    color: "#64748B",
  },

  rating: {
    marginTop: 12,
  },
});
