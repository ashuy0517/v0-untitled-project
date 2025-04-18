export type HealthData = {
  _id: string
  userId: string
  heartRate: number
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  oxygenLevel: number
  notes: string
  date: string
  createdAt: string
  updatedAt: string
}

export type HealthDataInput = Omit<HealthData, "_id" | "userId" | "createdAt" | "updatedAt">
