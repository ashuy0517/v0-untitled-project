"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { fetchHealthData, deleteHealthRecord } from "@/lib/api-service"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import HealthDataForm from "@/components/health-data-form"
import HealthDataTable from "@/components/health-data-table"
import HealthDataChart from "@/components/health-data-chart"
import type { HealthData } from "@/lib/types"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const { toast } = useToast()
  const [healthData, setHealthData] = useState<HealthData[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      loadHealthData()
    }
  }, [isAuthenticated])

  const loadHealthData = async () => {
    setIsDataLoading(true)
    try {
      const data = await fetchHealthData()
      setHealthData(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load health data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDataLoading(false)
    }
  }

  const handleDataAdded = () => {
    loadHealthData()
    toast({
      title: "Success",
      description: "Health data added successfully!",
    })
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteHealthRecord(id)
      setHealthData(healthData.filter((item) => item._id !== id))
      toast({
        title: "Success",
        description: "Record deleted successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete record. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="add-data">Add Health Data</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Latest Heart Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {healthData.length > 0 ? `${healthData[0].heartRate} bpm` : "No data"}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {healthData.length > 0
                          ? new Date(healthData[0].date).toLocaleString()
                          : "Record your first measurement"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Latest Blood Pressure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {healthData.length > 0
                          ? `${healthData[0].bloodPressureSystolic}/${healthData[0].bloodPressureDiastolic} mmHg`
                          : "No data"}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {healthData.length > 0
                          ? new Date(healthData[0].date).toLocaleString()
                          : "Record your first measurement"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Latest Oxygen Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {healthData.length > 0 ? `${healthData[0].oxygenLevel}%` : "No data"}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {healthData.length > 0
                          ? new Date(healthData[0].date).toLocaleString()
                          : "Record your first measurement"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Health Data</CardTitle>
                    <CardDescription>Your most recent health measurements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HealthDataTable data={healthData.slice(0, 5)} isLoading={isDataLoading} onDelete={handleDelete} />
                    {healthData.length > 5 && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.querySelector('[data-value="history"]')?.click()}
                      >
                        View All Records
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add-data">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Health Data</CardTitle>
                    <CardDescription>Record your latest health measurements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HealthDataForm onSuccess={handleDataAdded} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Data History</CardTitle>
                    <CardDescription>View all your recorded health measurements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HealthDataTable data={healthData} isLoading={isDataLoading} onDelete={handleDelete} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="charts">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Data Visualization</CardTitle>
                    <CardDescription>View your health trends over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HealthDataChart data={healthData} isLoading={isDataLoading} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
