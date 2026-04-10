import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SaeCard } from "@/components/SaeCard";
import { FilterBar } from "@/components/FilterBar";
import { apiService } from "@/services/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#7c3aed",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "#C9B2F0",
    fontSize: 14,
  },
  contentWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 12,
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  filterSection: {
    marginBottom: 16,
  },
  sortContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countText: {
    color: "#4B5563",
    fontSize: 14,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sortButtonActive: {
    backgroundColor: "#7c3aed",
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  sortButtonTextActive: {
    color: "#FFFFFF",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyText: {
    color: "#A0A0A0",
    textAlign: "center",
    marginTop: 16,
  },
  saesContainer: {
    paddingBottom: 100,
  },
});

export default function HomeScreen() {
  const router = useRouter();
  const [saes, setSaes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnnee, setSelectedAnnee] = useState("Tous");
  const [selectedRessource, setSelectedRessource] = useState("Tous");
  const [selectedSemestre, setSelectedSemestre] = useState("Tous");
  const [sortByNote, setSortByNote] = useState(false);

  useEffect(() => {
    loadSaes();
  }, []);

  const loadSaes = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getSaes();
      if (response.error) {
        setError(response.error);
        setSaes([]);
      } else {
        setSaes(response.data || []);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement");
      setSaes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract unique years from SAEs
  const uniqueYears = ["Tous", ...Array.from(
    new Set(saes.map(sae => String(sae.annee)).filter(Boolean))
  ).sort()];

  // Extract unique ressources from SAEs
  const uniqueRessources = ["Tous", ...Array.from(
    new Set(
      saes
        .flatMap(sae => sae.ressources || [])
        .map(r => r.nom)
        .filter(Boolean)
    )
  ).sort()];

  const filteredSaes = saes.filter((sae) => {
    const matchesSearch =
      sae.nom.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAnnee = selectedAnnee === "Tous" || String(sae.annee) === selectedAnnee;
    const matchesSemestre =
      selectedSemestre === "Tous" || String(sae.semestre) === selectedSemestre;
    const matchesRessource = selectedRessource === "Tous" || 
      (sae.ressources && sae.ressources.some((r: any) => r.nom === selectedRessource));

    return matchesSearch && matchesAnnee && matchesSemestre && matchesRessource;
  });

  const sortedSaes = sortByNote
    ? [...filteredSaes].sort(
        (a, b) => (b.averageNote || 0) - (a.averageNote || 0)
      )
    : filteredSaes;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Catalogue SAE</Text>
          <Text style={styles.headerSubtitle}>
            Explorez les projets des étudiants MMI
          </Text>
        </View>

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 48 }}>
            <ActivityIndicator size="large" color="#7c3aed" />
            <Text style={{ marginTop: 16, color: "#9CA3AF" }}>Chargement des SAE...</Text>
          </View>
        ) : error ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="alert-circle" size={48} color="#DC2626" />
            <Text style={[styles.emptyText, { color: "#DC2626" }]}>
              Erreur: {error}
            </Text>
            <TouchableOpacity
              onPress={loadSaes}
              style={{
                marginTop: 16,
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: "#7c3aed",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
                Réessayer
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.contentWrapper}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Rechercher une SAE..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#D1D5DB"
                style={styles.searchInput}
              />
            </View>

            {/* Filters */}
            <View style={styles.filterSection}>
              <FilterBar
                selectedAnnee={selectedAnnee}
                selectedRessource={selectedRessource}
                selectedSemestre={selectedSemestre}
                onAnneeChange={setSelectedAnnee}
                onRessourceChange={setSelectedRessource}
                onSemestreChange={setSelectedSemestre}
                annees={uniqueYears}
                ressources={uniqueRessources}
              />
            </View>

            {/* Sort Button & Count */}
            <View style={styles.sortContainer}>
              <Text style={styles.countText}>
                {sortedSaes.length} SAE trouvée
                {sortedSaes.length > 1 ? "s" : ""}
              </Text>
              <TouchableOpacity
                onPress={() => setSortByNote(!sortByNote)}
                style={[styles.sortButton, sortByNote && styles.sortButtonActive]}
              >
                <Ionicons
                  name="swap-vertical"
                  size={16}
                  color={sortByNote ? "white" : "#374151"}
                />
                <Text
                  style={[
                    styles.sortButtonText,
                    sortByNote && styles.sortButtonTextActive,
                  ]}
                >
                  Trier
                </Text>
              </TouchableOpacity>
            </View>

            {/* SAE Cards */}
            <View style={styles.saesContainer}>
              {sortedSaes.map((sae) => (
                <SaeCard
                  key={sae.id_sae || sae.id}
                  sae={sae}
                  onPress={() => router.push(`/sae/${sae.id_sae || sae.id}`)}
                />
              ))}
              {sortedSaes.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Ionicons name="search" size={48} color="#D1D5DB" />
                  <Text style={styles.emptyText}>Aucune SAE trouvée</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
