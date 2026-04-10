import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { apiService } from "@/services/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    color: "#111827",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 288,
    backgroundColor: "#F3F4F6",
  },
  imageIndicatorsContainer: {
    position: "absolute",
    bottom: 16,
    left: "50%",
    marginLeft: -50,
    flexDirection: "row",
    gap: 8,
  },
  imageDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  imageDotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  ratingBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  ratingText: {
    fontWeight: "700",
    fontSize: 18,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
  titleSection: {
    gap: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tagViolet: {
    backgroundColor: "#7c3aed",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagGray: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tagTextViolet: {
    color: "#FFFFFF",
  },
  tagTextGray: {
    color: "#374151",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    color: "#4B5563",
    lineHeight: 24,
  },
  cardsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  cardLabel: {
    fontWeight: "600",
    fontSize: 14,
  },
  cardLabelViolet: {
    color: "#7c3aed",
  },
  cardLabelGreen: {
    color: "#10B981",
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  cardSubtext: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  itemList: {
    gap: 8,
  },
  itemRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemText: {
    color: "#374151",
    fontSize: 14,
    flex: 1,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  personAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  personName: {
    color: "#111827",
    fontWeight: "600",
  },
  groupCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    gap: 12,
  },
  groupHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  groupMembers: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 4,
  },
  groupMembersText: {
    color: "#4B5563",
    fontSize: 14,
  },
  groupScore: {
    backgroundColor: "#FEF3C7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  groupScoreText: {
    fontWeight: "700",
  },
  membersList: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
  },
  memberText: {
    color: "#4B5563",
    fontSize: 14,
    marginBottom: 4,
  },
  linksRow: {
    flexDirection: "row",
    gap: 8,
  },
  linkButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  linkButtonViolet: {
    backgroundColor: "#F3E8FF",
  },
  linkButtonGray: {
    backgroundColor: "#F3F4F6",
  },
  linkButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  linkButtonTextViolet: {
    color: "#7c3aed",
  },
  linkButtonTextGray: {
    color: "#374151",
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    color: "#6B7280",
    marginTop: 16,
  },
});

export default function SaeDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [sae, setSae] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSaeDetail();
  }, [id]);

  const loadSaeDetail = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const response = await apiService.getSaeById(Number(id));
      if (response.error) {
        setError(response.error);
      } else {
        setSae(response.data);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#7c3aed" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !sae) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle" size={48} color="#9CA3AF" />
          <Text style={styles.notFoundText}>{error || "SAé non trouvée"}</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginTop: 16, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#7c3aed", borderRadius: 8 }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const meilleureNote = sae.averageNote || 
    (sae.groupeDetails && sae.groupeDetails.length > 0 
      ? Math.max(...sae.groupeDetails.map((g: any) => g.note || 0)) 
      : 0);
  
  // Convert Google Drive URLs to direct image links
  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return "";
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}=w800`;
    }
    return url;
  };
  
  console.log("=== SAE DETAIL DEBUG ===");
  console.log("SAE:", sae);
  console.log("Galeries:", sae.galeries);
  
  const images = (sae.galeries || []).map((g: any) => {
    const converted = convertGoogleDriveUrl(g.lien_google_drive);
    console.log("Converting:", g.lien_google_drive, "->", converted);
    return converted;
  }).filter((url: string) => url);
  
  console.log("Final images array:", images);
  const groupeDetails = sae.groupeDetails || [];

  const handleOpenLink = async (url?: string) => {
    if (!url) {
      Alert.alert("Info", "Lien non disponible");
      return;
    }
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erreur", "Impossible d'ouvrir le lien");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {sae.nom}
          </Text>
        </View>

        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          {images.length > 0 ? (
            <>
              <Image
                source={{ uri: images[selectedImage] }}
                style={styles.image}
              />
              {/* Image Indicators */}
              <View style={styles.imageIndicatorsContainer}>
                {images.map((_: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedImage(index)}
                    style={selectedImage === index ? styles.imageDotActive : styles.imageDotInactive}
                  />
                ))}
              </View>
            </>
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="image-outline" size={64} color="#D1D5DB" />
            </View>
          )}
          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={20} color="#FBBF24" />
            <Text style={styles.ratingText}>{meilleureNote}/20</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Title & Tags */}
          <View style={styles.titleSection}>
            <View style={styles.tagsContainer}>
              <View style={styles.tagViolet}>
                <Text style={[styles.tagText, styles.tagTextViolet]}>
                  {sae.domaine || "Général"}
                </Text>
              </View>
              <View style={styles.tagGray}>
                <Text style={[styles.tagText, styles.tagTextGray]}>
                  {sae.annee}
                </Text>
              </View>
              <View style={styles.tagGray}>
                <Text style={[styles.tagText, styles.tagTextGray]}>
                  S{sae.semestre}
                </Text>
              </View>
            </View>
            <Text style={styles.mainTitle}>
              {sae.nom}
            </Text>
            <Text style={styles.description}>
              {sae.contexte}
            </Text>
          </View>

          {/* Info Cards */}
          <View style={styles.cardsGrid}>
            <View style={styles.infoCard}>
              <View style={styles.cardHeaderRow}>
                <Ionicons name="calendar" size={20} color="#7c3aed" />
                <Text style={[styles.cardLabel, styles.cardLabelViolet]}>Dates</Text>
              </View>
              <Text style={styles.cardValue}>
                {sae.date_debut ? new Date(sae.date_debut).toLocaleDateString("fr-FR") : "N/A"}
              </Text>
              <Text style={styles.cardSubtext}>
                {sae.date_fin ? new Date(sae.date_fin).toLocaleDateString("fr-FR") : "N/A"}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.cardHeaderRow}>
                <Ionicons name="checkmark-done" size={20} color="#10B981" />
                <Text style={[styles.cardLabel, styles.cardLabelGreen]}>Taux</Text>
              </View>
              <Text style={styles.cardValue}>
                {sae.taux_reussite || "N/A"}
              </Text>
              <Text style={styles.cardSubtext}>
                de réussite
              </Text>
            </View>
          </View>

          {/* Referent */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="person" size={20} color="#7c3aed" />
              <Text style={[styles.cardLabel, styles.cardLabelViolet]}>Référent</Text>
            </View>
            <Text style={[styles.cardValue, { fontSize: 18 }]}>
              {sae.referents}
            </Text>
          </View>

          {/* UE & AC */}
          {sae.ues && sae.ues.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>
                Unités d'enseignement
              </Text>
              <View style={styles.itemList}>
                {sae.ues.map((u: any, index: number) => (
                  <View
                    key={index}
                    style={styles.itemRow}
                  >
                    <Ionicons name="checkmark-circle" size={20} color="#7c3aed" />
                    <Text style={styles.itemText}>{u.nom || u}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Activités */}
          {sae.acs && sae.acs.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>
                Activités professionnelles
              </Text>
              <View style={styles.itemList}>
                {sae.acs.map((a: any, index: number) => (
                  <View
                    key={index}
                    style={styles.itemRow}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#7c3aed"
                    />
                    <Text style={styles.itemText}>{a.nom || a}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Ressources Humaines */}
          {sae.ressources && sae.ressources.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>
                Équipe pédagogique
              </Text>
              <View style={styles.itemList}>
                {sae.ressources.map((rh: any, index: number) => (
                  <View
                    key={index}
                    style={[styles.itemRow, styles.personRow]}
                  >
                    <View style={styles.personAvatar}>
                      <Ionicons name="person" size={20} color="#7c3aed" />
                    </View>
                    <Text style={styles.personName}>{rh.nom || rh.prof || rh}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Groups */}
          <View>
            <Text style={styles.sectionTitle}>
              Groupes ({groupeDetails.length})
            </Text>
            <View style={styles.itemList}>
              {groupeDetails.map((groupe: any, index: number) => (
                <View
                  key={index}
                  style={styles.groupCard}
                >
                  <View style={styles.groupHeaderRow}>
                    <View style={styles.groupInfo}>
                      <Text style={styles.groupName}>
                        {groupe.prenom} {groupe.nom}
                      </Text>
                      <View style={styles.groupMembers}>
                        <Ionicons name="people" size={14} color="#6B7280" />
                        <Text style={styles.groupMembersText}>
                          Groupe {groupe.numero_groupe}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.groupScore}>
                      <Ionicons name="star" size={16} color="#FBBF24" />
                      <Text style={styles.groupScoreText}>{groupe.note}/20</Text>
                    </View>
                  </View>

                  {/* Links */}
                  <View style={styles.linksRow}>
                    {groupe.lien_site && (
                      <TouchableOpacity
                        onPress={() => handleOpenLink(groupe.lien_site)}
                        style={[styles.linkButton, styles.linkButtonViolet]}
                      >
                        <Ionicons
                          name="globe"
                          size={16}
                          color="#7c3aed"
                        />
                        <Text style={[styles.linkButtonText, styles.linkButtonTextViolet]}>
                          Site
                        </Text>
                      </TouchableOpacity>
                    )}
                    {groupe.lien_code && (
                      <TouchableOpacity
                        onPress={() => handleOpenLink(groupe.lien_code)}
                        style={[styles.linkButton, styles.linkButtonGray]}
                      >
                        <Ionicons
                          name="logo-github"
                          size={16}
                          color="#374151"
                        />
                        <Text style={[styles.linkButtonText, styles.linkButtonTextGray]}>
                          Code
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
