import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: number;
};

export default function StatCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    margin: 4,
    alignItems: "center",
  },

  value: {
    fontSize: 22,
    fontWeight: "700",
  },

  label: {
    marginTop: 4,
    color: "#64748B",
  },
});
