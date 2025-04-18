import axios from "axios"
import type { HealthData, HealthDataInput } from "./types"

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://healthtracking24.vercel.app/api",
})

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }

    return Promise.reject(error.response?.data || error)
  },
)

// Auth API calls
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await api.post("/auth/register", userData)
  return response.data
}

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post("/auth/login", credentials)
  return response.data
}

// Health data API calls
export const fetchHealthData = async (): Promise<HealthData[]> => {
  const response = await api.get("/health-data")
  return response.data
}

export const addHealthData = async (data: HealthDataInput): Promise<HealthData> => {
  const response = await api.post("/health-data", data)
  return response.data
}

export const deleteHealthRecord = async (id: string): Promise<void> => {
  await api.delete(`/health-data/${id}`)
}
