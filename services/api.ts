import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:8080/api";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

class ApiService {
  private token: string | null = null;

  async setToken(token: string) {
    this.token = token;
    try {
      await AsyncStorage.setItem("auth_token", token);
    } catch (e) {
      console.log("Could not save token to storage");
    }
  }

  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("auth_token");
    } catch (e) {
      console.log("Could not retrieve token from storage");
      return null;
    }
  }

  async clearToken() {
    this.token = null;
    try {
      await AsyncStorage.removeItem("auth_token");
    } catch (e) {
      console.log("Could not clear token from storage");
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const headers: any = {
        "Content-Type": "application/json",
      };

      if (this.token) {
        headers["Authorization"] = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.message || `API Error: ${response.status}`,
          status: response.status,
        };
      }

      return {
        data: data as T,
        status: response.status,
      };
    } catch (error: any) {
      return {
        error: error.message || "Network error",
        status: 0,
      };
    }
  }

  // Public method for generic requests
  async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
  ) {
    return this.makeRequest<T>(endpoint, method, body);
  }

  // ========== AUTH ==========
  async login(identifiant: string, password: string) {
    return this.makeRequest<{
      id: number;
      identifiant: string;
      token: string;
    }>("/auth/login", "POST", { identifiant, password });
  }

  // ========== SAE ==========
  async getSaes() {
    return this.makeRequest<any[]>("/sae", "GET");
  }

  async getSaeById(id: number) {
    return this.makeRequest<any>(`/sae/${id}`, "GET");
  }

  async createSae(saeData: {
    nom: string;
    contexte: string;
    semestre: number;
    annee: number;
    referent: string;
  }) {
    return this.makeRequest<any>("/sae", "POST", saeData);
  }

  async getSaesByAnnee(annee: number) {
    return this.makeRequest<any[]>(`/sae/filter/annee/${annee}`, "GET");
  }

  async getSaesBySemestre(semestre: number) {
    return this.makeRequest<any[]>(`/sae/filter/semestre/${semestre}`, "GET");
  }

  async getSaesByAnneeAndSemestre(annee: number, semestre: number) {
    return this.makeRequest<any[]>(
      `/filter/annee-semestre?annee=${annee}&semestre=${semestre}`,
      "GET"
    );
  }

  // ========== GROUPES ==========
  async getGroupes() {
    return this.makeRequest<any[]>("/groupe", "GET");
  }

  async createGroupe(groupeData: {
    numero_groupe: number;
    nom: string;
    prenom: string;
    note: number;
  }) {
    return this.makeRequest<any>("/groupe", "POST", groupeData);
  }

  // ========== SAE-GROUPE LIAISON ==========
  async linkGroupeToSae(data: {
    id_sae: number;
    id_grp: number;
    lien_site?: string;
    lien_code?: string;
  }) {
    return this.makeRequest<any>("/sae-grp", "POST", data);
  }

  async getSaeGroupes(idSae: number) {
    return this.makeRequest<any[]>(`/sae-grp/sae/${idSae}`, "GET");
  }

  // ========== GALERIE ==========
  async getGalerieSae(idSae: number) {
    return this.makeRequest<any[]>(`/galerie/sae/${idSae}`, "GET");
  }

  // ========== STATISTIQUES ==========
  async getClassement() {
    return this.makeRequest<any[]>("/statistics/classement", "GET");
  }

  async getClassementParAnnee(annee: number) {
    return this.makeRequest<any[]>(`/statistics/classement/par-annee/${annee}`, "GET");
  }

  async getTauxReussite(idSae: number) {
    return this.makeRequest<any>(`/statistics/taux-reussite/${idSae}`, "GET");
  }
}

export const apiService = new ApiService();
