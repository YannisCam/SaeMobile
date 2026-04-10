import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/useAuthStore";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7c3aed",
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoCircle: {
    width: 64,
    height: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    color: "#EDE9FE",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    marginLeft: 12,
    flex: 1,
    color: "#111827",
    fontSize: 16,
  },
  demoBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
  },
  demoText: {
    color: "#1E3A8A",
    fontSize: 12,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  loginText: {
    color: "#7c3aed",
    fontWeight: "700",
    fontSize: 18,
  },
  forgotButton: {
    alignItems: "center",
  },
  forgotText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    paddingHorizontal: 16,
  },
});

export default function LoginScreen() {
  const router = useRouter();
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleGoBack = () => {
    router.replace("/(tabs)");
  };

  const handleLogin = async () => {
    setErrorMessage("");
    
    if (!identifiant || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(identifiant, password);
      if (result.success) {
        router.replace("/(tabs)/admin");
      } else {
        // Afficher le message d'erreur spécifique
        const errorMsg = result.error || "Identifiants invalides";
        if (errorMsg.includes("mot de passe") || errorMsg.includes("incorrect")) {
          setErrorMessage("❌ Mot de passe incorrect");
        } else if (errorMsg.includes("Identifiant")) {
          setErrorMessage("❌ Identifiant non trouvé");
        } else {
          setErrorMessage("❌ " + errorMsg);
        }
      }
    } catch (error) {
      setErrorMessage("❌ Erreur de connexion: " + ((error as any).message || "Une erreur est survenue"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={handleGoBack}
            style={{ marginBottom: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="book" size={32} color="#7c3aed" />
            </View>
            <Text style={styles.title}>SAE Mobile</Text>
            <Text style={styles.subtitle}>
              Connexion à votre compte étudiant
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formGroup}>
            {/* Identifiant Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <Ionicons name="person" size={20} color="#9CA3AF" />
                <TextInput
                  placeholder="Identifiant"
                  placeholderTextColor="#D1D5DB"
                  value={identifiant}
                  onChangeText={setIdentifiant}
                  autoCapitalize="none"
                  style={styles.textInput}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <Ionicons name="key-outline" size={20} color="#9CA3AF" />
                <TextInput
                  placeholder="Mot de passe"
                  placeholderTextColor="#D1D5DB"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  style={styles.textInput}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* Error Message Display */}
          {errorMessage && (
            <View style={{ 
              backgroundColor: "#FEE2E2", 
              borderRadius: 8, 
              padding: 12, 
              marginBottom: 16,
              borderLeftWidth: 4,
              borderLeftColor: "#EF4444"
            }}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
