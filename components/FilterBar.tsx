import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FilterBarProps {
  selectedAnnee: string;
  selectedRessource: string;
  selectedSemestre: string;
  onAnneeChange: (value: string) => void;
  onRessourceChange: (value: string) => void;
  onSemestreChange: (value: string) => void;
  annees?: string[];
  ressources?: string[];
}

const DEFAULT_ANNEES = ["Tous"];
const DEFAULT_RESSOURCES = ["Tous"];
const SEMESTRES = ["Tous", "S3", "S4", "S5", "S6"];

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterLabelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    opacity: 0.7,
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
    marginTop: 4,
  },
  expandedOptions: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionLastChild: {
    borderBottomWidth: 0,
  },
  optionSelected: {
    backgroundColor: "#F3E8FF",
  },
  optionText: {
    fontSize: 14,
    color: "#374151",
  },
  optionTextSelected: {
    color: "#7c3aed",
    fontWeight: "600",
  },
});

export function FilterBar({
  selectedAnnee,
  selectedRessource,
  selectedSemestre,
  onAnneeChange,
  onRessourceChange,
  onSemestreChange,
  annees = DEFAULT_ANNEES,
  ressources = DEFAULT_RESSOURCES,
}: FilterBarProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const FilterButton = ({
    label,
    value,
    filterOptions,
    onSelect,
  }: {
    label: string;
    value: string;
    filterOptions: string[];
    onSelect: (v: string) => void;
  }) => (
    <View>
      <TouchableOpacity
        onPress={() =>
          setExpandedFilter(expandedFilter === label ? null : label)
        }
        style={styles.filterButton}
      >
        <View style={styles.filterLabelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Ionicons
          name={expandedFilter === label ? "chevron-up" : "chevron-down"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

      {expandedFilter === label && (
        <View style={styles.expandedOptions}>
          {filterOptions.map((option, index) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                onSelect(option);
                setExpandedFilter(null);
              }}
              style={[
                styles.option,
                value === option && styles.optionSelected,
                index === filterOptions.length - 1 && styles.optionLastChild,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  value === option && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
              {value === option && (
                <Ionicons name="checkmark" size={18} color="#7c3aed" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FilterButton
        label="Année"
        value={selectedAnnee}
        filterOptions={annees}
        onSelect={onAnneeChange}
      />
      <FilterButton
        label="Ressource"
        value={selectedRessource}
        filterOptions={ressources}
        onSelect={onRessourceChange}
      />
      <FilterButton
        label="Semestre"
        value={selectedSemestre}
        filterOptions={SEMESTRES}
        onSelect={onSemestreChange}
      />
    </View>
  );
}
