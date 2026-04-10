import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SaeCardProps {
  sae: any;
  onPress: () => void;
}

// Convert Google Drive share links to direct image URLs
const convertGoogleDriveUrl = (url: string): string => {
  if (!url) return "";
  // Handle Google Drive share links: https://drive.google.com/file/d/FILE_ID/view
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}=w800`;
  }
  // Return as-is if already a direct link
  return url;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 192,
    backgroundColor: "#F3F4F6",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderIcon: {
    opacity: 0.3,
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#000",
  },
  domainBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#7c3aed",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  domainText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#F3E8FF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    color: "#7c3aed",
    fontSize: 12,
    fontWeight: "600",
  },
  tagGray: {
    backgroundColor: "#F3F4F6",
  },
  tagTextGray: {
    color: "#4B5563",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: "#4B5563",
    fontSize: 14,
  },
});

export function SaeCard({ sae, onPress }: SaeCardProps) {
  // Handle both API format and mock format
  // Map galeries to images (Google Drive links)
  const galeries = sae.galeries || [];
  const imageUrls = galeries
    .map((g: any) => g.lien_google_drive)
    .filter(Boolean)
    .map(convertGoogleDriveUrl);
  
  const groupes = sae.groupeDetails || sae.groupes || [];
  const meilleureNote = sae.averageNote || 
    (groupes.length > 0 ? Math.max(...groupes.map((g: any) => g.note || 0)) : 0);
  const domaine = sae.domaine || "Général";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.7}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        {imageUrls.length > 0 ? (
          <Image
            source={{ uri: imageUrls[0] }}
            style={styles.image}
          />
        ) : (
          <Ionicons
            name="image-outline"
            size={64}
            color="#D1D5DB"
            style={styles.placeholderIcon}
          />
        )}
        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={16} color="#FBBF24" />
          <Text style={styles.ratingText}>{meilleureNote}/20</Text>
        </View>
        {/* Domain Badge */}
        <View style={styles.domainBadge}>
          <Text style={styles.domainText}>{domaine}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Year & Semester Tags */}
        <View style={styles.tagsContainer}>
          <View style={[styles.tag]}>
            <Text style={styles.tagText}>{sae.annee}</Text>
          </View>
          <View style={[styles.tag, styles.tagGray]}>
            <Text style={[styles.tagText, styles.tagTextGray]}>S{sae.semestre}</Text>
          </View>
        </View>

        {/* Title */}
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {sae.nom}
        </Text>

        {/* Groups Count */}
        <View style={styles.footer}>
          <Ionicons name="people" size={16} color="#6B7280" />
          <Text style={styles.footerText}>
            {groupes.length} groupe{groupes.length > 1 ? "s" : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
