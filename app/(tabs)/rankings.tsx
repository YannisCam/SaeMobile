import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiService } from "@/services/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#7c3aed",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
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
  rankingTable: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rankingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  rankingRowLast: {
    borderBottomWidth: 0,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  rankText: {
    color: "#7c3aed",
    fontWeight: "700",
    fontSize: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 14,
  },
  groupMembersContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  groupMembers: {
    color: "#4B5563",
    fontSize: 12,
  },
  groupSae: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
  noteBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFBEB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  noteText: {
    fontWeight: "700",
    color: "#111827",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },
  statLabel: {
    color: "#4B5563",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
});

export default function RankingsScreen() {
  const [groupes, setGroupes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getSaes();
      if (response.error) {
        setError(response.error);
        setGroupes([]);
      } else {
        // Extract all groups from all SAEs
        const allGroups = (response.data || [])
          .flatMap((sae: any) =>
            (sae.groupeDetails || []).map((groupe: any) => ({
              ...groupe,
              saeId: sae.id_sae || sae.id,
              saeName: sae.nom,
            }))
          )
          .sort((a: any, b: any) => b.note - a.note);

        setGroupes(allGroups);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement");
      setGroupes([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#7c3aed" />
          <Text style={{ marginTop: 16, color: "#9CA3AF" }}>Chargement du classement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}>
          <Ionicons name="alert-circle" size={48} color="#DC2626" />
          <Text style={{ marginTop: 16, color: "#DC2626", textAlign: "center" }}>
            Erreur: {error}
          </Text>
          <TouchableOpacity
            onPress={loadRankings}
            style={{
              marginTop: 16,
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: "#7c3aed",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const averageNote =
    groupes.length > 0
      ? (groupes.reduce((sum, g) => sum + g.note, 0) / groupes.length).toFixed(1)
      : "0";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Classement Général</Text>
          <Text style={styles.headerSubtitle}>
            Les meilleurs groupes par note
          </Text>
        </View>

        <View style={styles.contentWrapper}>
        {/* Ranking Table */}
          <View style={styles.rankingTable}>
            {groupes.map((groupe, index) => (
              <View
                key={`${groupe.saeId}-${groupe.id_grp || index}`}
                style={[
                  styles.rankingRow,
                  index === groupes.length - 1 && styles.rankingRowLast,
                ]}
              >
                {/* Rank */}
                <View style={styles.rankBadge}>
                  {index < 3 ? (
                    <Ionicons
                      name="medal"
                      size={20}
                      color={
                        index === 0
                          ? "#FFD700"
                          : index === 1
                          ? "#C0C0C0"
                          : "#CD7F32"
                      }
                    />
                  ) : (
                    <Text style={styles.rankText}>{index + 1}</Text>
                  )}
                </View>

                {/* Group Info */}
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>
                    {groupe.prenom} {groupe.nom}
                  </Text>
                  <View style={styles.groupMembersContainer}>
                    <Ionicons name="person" size={12} color="#4B5563" />
                    <Text style={styles.groupMembers}>
                      Groupe #{groupe.numero_groupe}
                    </Text>
                  </View>
                  <Text style={styles.groupSae}>
                    {groupe.saeName.substring(0, 30)}
                    {groupe.saeName.length > 30 ? "..." : ""}
                  </Text>
                </View>

                {/* Note */}
                <View style={styles.noteBadge}>
                  <Ionicons name="star" size={16} color="#FBBF24" />
                  <Text style={styles.noteText}>{groupe.note}/20</Text>
                </View>
              </View>
            ))}
            {groupes.length === 0 && (
              <View style={{ alignItems: "center", padding: 24 }}>
                <Text style={{ color: "#9CA3AF" }}>Aucun groupe disponible</Text>
              </View>
            )}
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="people" size={32} color="#7c3aed" />
              </View>
              <Text style={styles.statValue}>{groupes.length}</Text>
              <Text style={styles.statLabel}>Groupes classés</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="award" size={32} color="#7c3aed" />
              </View>
              <Text style={styles.statValue}>{averageNote}</Text>
              <Text style={styles.statLabel}>Moyenne générale</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
