import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/useAuthStore";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    backgroundColor: "#7c3aed",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#FFFFFF" },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 12,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#111827", marginBottom: 6 },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: "#111827",
  },
  dropdown: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: "#111827",
  },
  itemBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemBoxText: { fontSize: 14, color: "#111827", fontWeight: "500" },
  itemSelected: { backgroundColor: "#dbeafe" },
  submitButton: {
    backgroundColor: "#059669",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: { fontWeight: "600", fontSize: 14, color: "#FFFFFF" },
  groupCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#059669",
  },
  groupTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  studentContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  studentInputsRow: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  smallInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 10,
    color: "#111827",
    fontSize: 12,
  },
  addButton: {
    backgroundColor: "#059669",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 12 },
  removeButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface AC {
  id_ac: number;
  nom: string;
}

interface UE {
  id_ue: number;
  nom: string;
}

interface Ressource {
  id_ressource: number;
  nom: string;
  prof: string;
}

interface Student {
  nom: string;
  prenom: string;
  note: string;
}

interface GalerieLink {
  id: string;
  titre: string;
  lien_google_drive: string;
}

interface Group {
  id: string;
  nomGroupe: string;
  students: Student[];
  lien_code?: string;
  lien_site?: string;
}

export default function AdminScreen() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const [nom, setNom] = useState("");
  const [annee, setAnnee] = useState("2024");
  const [semestre, setSemestre] = useState("S1");
  const [referents, setReferents] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const [acList, setAcList] = useState<AC[]>([]);
  const [ueList, setUeList] = useState<UE[]>([]);
  const [ressourceList, setRessourceList] = useState<Ressource[]>([]);

  const [selectedAC, setSelectedAC] = useState<number[]>([]);
  const [selectedUE, setSelectedUE] = useState<number[]>([]);
  const [selectedRessource, setSelectedRessource] = useState<number[]>([]);

  const [nomGroupe, setNomGroupe] = useState("");
  const [groupeLienCode, setGroupeLienCode] = useState("");
  const [groupeLienSite, setGroupeLienSite] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentStudents, setCurrentStudents] = useState<Student[]>([]);

  const [galeries, setGaleries] = useState<GalerieLink[]>([]);
  const [galerieTitle, setGalerieTitle] = useState("");
  const [galerieLien, setGalerieLien] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn) {
        // Delay navigation to ensure router is ready
        setTimeout(() => {
          router.replace("/(auth)/login");
        }, 100);
      } else {
        loadData();
      }
    };
    checkAuth();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // Fetch real data from API
      const acResponse = await fetch("http://localhost:8080/api/ac");
      const ueResponse = await fetch("http://localhost:8080/api/ue");
      const ressResponse = await fetch("http://localhost:8080/api/ressource");

      const acData = acResponse.ok ? await acResponse.json() : [];
      const ueData = ueResponse.ok ? await ueResponse.json() : [];
      const ressData = ressResponse.ok ? await ressResponse.json() : [];

      // Handle different API response formats
      const acList = Array.isArray(acData) ? acData : (acData.value || []);
      const ueList = Array.isArray(ueData) ? ueData : (ueData.value || []);
      const ressList = Array.isArray(ressData) ? ressData : (ressData.value || []);

      setAcList(acList);
      setUeList(ueList);
      setRessourceList(ressList);
    } catch (error) {
      console.error("Erreur chargement:", error);
      // Fallback to mock data
      setAcList([
        { id_ac: 1, nom: "AC Programmation" },
        { id_ac: 2, nom: "AC Web" },
      ]);
      setUeList([
        { id_ue: 1, nom: "UE1 - Fondamentaux" },
        { id_ue: 2, nom: "UE2 - Projets" },
      ]);
      setRessourceList([
        { id_ressource: 1, nom: "Spring Boot", prof: "Dupont" },
        { id_ressource: 2, nom: "React", prof: "Martin" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  const toggleSelection = (id: number, type: "ac" | "ue" | "ressource") => {
    if (type === "ac") {
      setSelectedAC((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else if (type === "ue") {
      setSelectedUE((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else if (type === "ressource") {
      setSelectedRessource((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const addStudent = () => {
    setCurrentStudents([...currentStudents, { nom: "", prenom: "", note: "" }]);
  };

  const updateStudent = (index: number, field: string, value: string) => {
    const updated = [...currentStudents];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentStudents(updated);
  };

  const removeStudent = (index: number) => {
    setCurrentStudents(currentStudents.filter((_, i) => i !== index));
  };

  const createGroup = () => {
    if (!nomGroupe.trim()) {
      Alert.alert("Erreur", "Entrez le nom du groupe");
      return;
    }
    if (currentStudents.length === 0) {
      Alert.alert("Erreur", "Ajoutez au moins un étudiant");
      return;
    }

    // Save group name before resetting state
    const groupNameSaved = nomGroupe;

    const newGroup: Group = {
      id: Date.now().toString(),
      nomGroupe,
      students: [...currentStudents],
      lien_code: groupeLienCode || undefined,
      lien_site: groupeLienSite || undefined,
    };

    // Reset all form fields FIRST
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    
    // Schedule state reset to happen together
    setNomGroupe("");
    setGroupeLienCode("");
    setGroupeLienSite("");
    setCurrentStudents([]);

    // Show alert after brief delay to ensure state resets
    setTimeout(() => {
      Alert.alert("Succès", `Groupe "${groupNameSaved}" créé!`);
    }, 100);
  };

  const removeGroup = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  const addGalerie = () => {
    if (!galerieTitle.trim() || !galerieLien.trim()) {
      Alert.alert("Erreur", "Renseignez titre et lien Google Drive");
      return;
    }
    const newGalerie: GalerieLink = {
      id: Date.now().toString(),
      titre: galerieTitle,
      lien_google_drive: galerieLien,
    };
    setGaleries([...galeries, newGalerie]);
    setGalerieTitle("");
    setGalerieLien("");
    Alert.alert("Succès", `Ressource Google Drive ajoutée!`);
  };

  const removeGalerie = (id: string) => {
    setGaleries(galeries.filter((g) => g.id !== id));
  };

  const handleCreateSAE = async () => {
    if (!nom || !referents || !dateDebut || !dateFin) {
      Alert.alert("Erreur", "Remplissez tous les champs requis");
      return;
    }
    if (groups.length === 0) {
      Alert.alert("Erreur", "Créez au moins un groupe");
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculer note MAX pour chaque groupe
      const groupsWithMaxNote = groups.map((group) => {
        const notes = group.students
          .map((s) => parseFloat(s.note) || 0)
          .filter((n) => !isNaN(n));
        const maxNote = notes.length > 0 ? Math.max(...notes) : 0;
        
        return {
          nom_groupe: group.nomGroupe,
          students: group.students,
          lien_code: group.lien_code,
          lien_site: group.lien_site,
          note_max: maxNote,
        };
      });

      const payload = {
        nom,
        annee: parseInt(annee),
        semestre,
        referents,
        date_debut: dateDebut,
        date_fin: dateFin,
        ac_ids: selectedAC,
        ue_ids: selectedUE,
        ressource_ids: selectedRessource,
        galeries: galeries.map((g) => ({
          titre: g.titre,
          lien_google_drive: g.lien_google_drive,
        })),
        groups: groupsWithMaxNote,
      };

      console.log("=== PAYLOAD ENVOYÉ ===");
      console.log(JSON.stringify(payload, null, 2));
      console.log("Types:", {
        nom: typeof payload.nom,
        annee: typeof payload.annee,
        semestre: typeof payload.semestre,
        referents: typeof payload.referents,
        date_debut: typeof payload.date_debut,
        date_fin: typeof payload.date_fin,
        ac_ids: Array.isArray(payload.ac_ids),
        selectedAC: selectedAC,
      });

      // Call API to create SAE
      const response = await fetch("http://localhost:8080/api/sae/create-full", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Status réponse:", response.status);
      console.log("Headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Erreur brute:", errorText);
        throw new Error(`Erreur ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("SAE créée:", result);
      Alert.alert("Succès", `SAE "${nom}" créée avec ${groups.length} groupe(s) et ${galeries.length} ressource(s)!`);
      
      // Reset form
      setNom("");
      setAnnee("2024");
      setSemestre("S1");
      setReferents("");
      setDateDebut("");
      setDateFin("");
      setSelectedAC([]);
      setSelectedUE([]);
      setSelectedRessource([]);
      setGroups([]);
      setCurrentStudents([]);
      setGaleries([]);
      setGalerieTitle("");
      setGalerieLien("");
      setGroupeLienCode("");
      setGroupeLienSite("");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Administration</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#7c3aed" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Administration</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Créer une SAE</Text>

        <View style={styles.formCard}>
          {/* INFOS DE BASE */}
          <Text style={styles.label}>Nom de la SAE *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: SAE Portail Web"
            value={nom}
            onChangeText={setNom}
          />

          <Text style={styles.label}>Année *</Text>
          <View style={[styles.dropdown, { flexDirection: "row", justifyContent: "space-around" }]}>
            {["2023", "2024", "2025", "2026"].map((year) => (
              <TouchableOpacity
                key={year}
                onPress={() => setAnnee(year)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: annee === year ? "#059669" : "#E5E7EB",
                }}
              >
                <Text style={{ color: annee === year ? "#FFF" : "#111827", fontWeight: "600" }}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Semestre *</Text>
          <View style={[styles.dropdown, { flexDirection: "row", justifyContent: "space-around" }]}>
            {["S1", "S2", "S3", "S4", "S5", "S6"].map((sem) => (
              <TouchableOpacity
                key={sem}
                onPress={() => setSemestre(sem)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: semestre === sem ? "#0891b2" : "#E5E7EB",
                }}
              >
                <Text style={{ color: semestre === sem ? "#FFF" : "#111827", fontWeight: "600" }}>
                  {sem}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Référent *</Text>
          <TextInput style={styles.input} placeholder="Nom du référent" value={referents} onChangeText={setReferents} />

          <Text style={styles.label}>Date Début (YYYY-MM-DD) *</Text>
          <TextInput style={styles.input} placeholder="2024-01-15" value={dateDebut} onChangeText={setDateDebut} />

          <Text style={styles.label}>Date Fin (YYYY-MM-DD) *</Text>
          <TextInput style={styles.input} placeholder="2024-06-30" value={dateFin} onChangeText={setDateFin} />

          {/* AC SELECTION */}
          <Text style={styles.label}>
            Sélectionner les AC ({selectedAC.length})
          </Text>
          {acList.length > 0 ? (
            acList.map((ac) => (
              <TouchableOpacity
                key={ac.id_ac}
                style={[styles.itemBox, selectedAC.includes(ac.id_ac) && styles.itemSelected]}
                onPress={() => toggleSelection(ac.id_ac, "ac")}
              >
                <Text style={styles.itemBoxText}>{ac.nom}</Text>
                <Ionicons
                  name={selectedAC.includes(ac.id_ac) ? "checkmark-circle" : "ellipse-outline"}
                  size={20}
                  color={selectedAC.includes(ac.id_ac) ? "#059669" : "#D1D5DB"}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ fontSize: 12, color: "#999" }}>Aucune AC disponible</Text>
          )}

          {/* UE SELECTION */}
          <Text style={[styles.label, { marginTop: 12 }]}>
            Sélectionner les UE ({selectedUE.length})
          </Text>
          {ueList.length > 0 ? (
            ueList.map((ue) => (
              <TouchableOpacity
                key={ue.id_ue}
                style={[styles.itemBox, selectedUE.includes(ue.id_ue) && styles.itemSelected]}
                onPress={() => toggleSelection(ue.id_ue, "ue")}
              >
                <Text style={styles.itemBoxText}>{ue.nom}</Text>
                <Ionicons
                  name={selectedUE.includes(ue.id_ue) ? "checkmark-circle" : "ellipse-outline"}
                  size={20}
                  color={selectedUE.includes(ue.id_ue) ? "#0891b2" : "#D1D5DB"}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ fontSize: 12, color: "#999" }}>Aucune UE disponible</Text>
          )}

          {/* RESSOURCE SELECTION */}
          <Text style={[styles.label, { marginTop: 12 }]}>
            Sélectionner les Ressources ({selectedRessource.length})
          </Text>
          {ressourceList.length > 0 ? (
            ressourceList.map((res) => (
              <TouchableOpacity
                key={res.id_ressource}
                style={[styles.itemBox, selectedRessource.includes(res.id_ressource) && styles.itemSelected]}
                onPress={() => toggleSelection(res.id_ressource, "ressource")}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemBoxText}>{res.nom}</Text>
                  <Text style={{ fontSize: 12, color: "#6B7280" }}>{res.prof}</Text>
                </View>
                <Ionicons
                  name={selectedRessource.includes(res.id_ressource) ? "checkmark-circle" : "ellipse-outline"}
                  size={20}
                  color={selectedRessource.includes(res.id_ressource) ? "#f59e0b" : "#D1D5DB"}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ fontSize: 12, color: "#999" }}>Aucune Ressource disponible</Text>
          )}
        </View>

        {/* RESSOURCES GOOGLE DRIVE */}
        <Text style={styles.sectionTitle}>Ressources Google Drive</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Titre de la ressource</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Documentation, Présentation"
            value={galerieTitle}
            onChangeText={setGalerieTitle}
          />

          <Text style={styles.label}>Lien Google Drive</Text>
          <TextInput
            style={styles.input}
            placeholder="https://drive.google.com/..."
            value={galerieLien}
            onChangeText={setGalerieLien}
          />

          <TouchableOpacity style={styles.submitButton} onPress={addGalerie}>
            <Text style={styles.submitButtonText}>+ Ajouter image</Text>
          </TouchableOpacity>

          {galeries.length > 0 && (
            <>
              <Text style={[styles.label, { marginTop: 16 }]}>Ressources ajoutées ({galeries.length})</Text>
              {galeries.map((galerie) => (
                <View key={galerie.id} style={styles.groupCard}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.groupTitle}>{galerie.titre}</Text>
                      <Text style={{ fontSize: 12, color: "#0891b2", marginTop: 4 }}>
                        {galerie.lien_google_drive}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => removeGalerie(galerie.id)}>
                      <Ionicons name="trash" size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>

        {/* CRÉATION DES GROUPES */}
        <Text style={styles.sectionTitle}>Créer les Groupes</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Nom du groupe *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Groupe 1"
            value={nomGroupe}
            onChangeText={setNomGroupe}
          />

          <Text style={styles.label}>Lien du code (GitHub/GitLab)</Text>
          <TextInput
            style={styles.input}
            placeholder="https://github.com/..."
            value={groupeLienCode}
            onChangeText={setGroupeLienCode}
          />

          <Text style={styles.label}>Lien du site</Text>
          <TextInput
            style={styles.input}
            placeholder="https://..."
            value={groupeLienSite}
            onChangeText={setGroupeLienSite}
          />

          <Text style={styles.label}>Ajouter des étudiants</Text>

          {currentStudents.map((student, idx) => (
            <View key={idx} style={styles.studentContainer}>
              <View style={styles.studentInputsRow}>
                <TextInput
                  style={[styles.smallInput, { flex: 1.2 }]}
                  placeholder="Nom"
                  value={student.nom}
                  onChangeText={(val) => updateStudent(idx, "nom", val)}
                />
                <TextInput
                  style={[styles.smallInput, { flex: 1.2 }]}
                  placeholder="Prénom"
                  value={student.prenom}
                  onChangeText={(val) => updateStudent(idx, "prenom", val)}
                />
                <TextInput
                  style={[styles.smallInput, { flex: 0.8 }]}
                  placeholder="Note"
                  value={student.note}
                  onChangeText={(val) => updateStudent(idx, "note", val)}
                  keyboardType="decimal-pad"
                />
              </View>
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => removeStudent(idx)}
              >
                <Ionicons name="trash" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addStudent}>
            <Text style={styles.addButtonText}>+ Ajouter étudiant</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.submitButton, { marginTop: 8 }]} onPress={createGroup}>
            <Text style={styles.submitButtonText}>Créer le groupe</Text>
          </TouchableOpacity>

          {/* GROUPES CRÉÉS */}
          {groups.length > 0 && (
            <>
              <Text style={[styles.label, { marginTop: 16 }]}>Groupes créés ({groups.length})</Text>
              {groups.map((group) => (
                <View key={group.id} style={styles.groupCard}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.groupTitle}>{group.nomGroupe}</Text>
                    <TouchableOpacity onPress={() => removeGroup(group.id)}>
                      <Ionicons name="trash" size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                  {group.students.map((student, idx) => (
                    <Text key={idx} style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                      • {student.nom} {student.prenom} (Note: {student.note})
                    </Text>
                  ))}
                  {(group.lien_code || group.lien_site) && (
                    <View style={{ marginTop: 8, borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 8 }}>
                      {group.lien_code && (
                        <Text style={{ fontSize: 12, color: "#0891b2", marginTop: 4 }}>
                          Code: {group.lien_code}
                        </Text>
                      )}
                      {group.lien_site && (
                        <Text style={{ fontSize: 12, color: "#0891b2", marginTop: 4 }}>
                          Site: {group.lien_site}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
        </View>

        {/* BOUTON CRÉER SAE */}
        <View style={styles.formCard}>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: groups.length > 0 ? "#059669" : "#ccc" }]}
            onPress={handleCreateSAE}
            disabled={isSubmitting || groups.length === 0}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Créer la SAE</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
