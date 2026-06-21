import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      style={[styles.chip, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    marginRight: 8,
  },

  selected: {
    backgroundColor: "#2563EB",
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
  },

  selectedText: {
    color: "#FFFFFF",
  },
});
