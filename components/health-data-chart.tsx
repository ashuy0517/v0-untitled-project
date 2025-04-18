"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { HealthData } from "@/lib/types"

type HealthDataChartProps = {
  data: HealthData[]
  isLoading: boolean
}

export default function HealthDataChart({ data, isLoading }: HealthDataChartProps) {
  const [timeRange, setTimeRange] = useState("7")

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No health data recorded yet. Add your first measurement to see charts.
      </div>
    )
  }

  // Filter data based on selected time range
  const filteredData = (() => {
    const now = new Date()
    const days = Number.parseInt(timeRange)
    const cutoff = new Date(now.setDate(now.getDate() - days))

    return data
      .filter((item) => new Date(item.date) >= cutoff)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  })()

  // Format data for chart
  const chartData = filteredData.map((item) => ({
    date: format(new Date(item.date), "MM/dd HH:mm"),
    heartRate: item.heartRate,
    bloodPressureSystolic: item.bloodPressureSystolic,
    bloodPressureDiastolic: item.bloodPressureDiastolic,
    oxygenLevel: item.oxygenLevel,
  }))

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-2">Heart Rate</h3>
          <ChartContainer
            config={{
              heartRate: {
                label: "Heart Rate (bpm)",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="heartRate" stroke="var(--color-heartRate)" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-2">Blood Pressure</h3>
          <ChartContainer
            config={{
              bloodPressureSystolic: {
                label: "Systolic (mmHg)",
                color: "hsl(var(--chart-1))",
              },
              bloodPressureDiastolic: {
                label: "Diastolic (mmHg)",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="bloodPressureSystolic"
                  stroke="var(--color-bloodPressureSystolic)"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="bloodPressureDiastolic" stroke="var(--color-bloodPressureDiastolic)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="h-[300px]">
          <h3 className="text-lg font-medium mb-2">Oxygen Level</h3>
          <ChartContainer
            config={{
              oxygenLevel: {
                label: "Oxygen Level (%)",
                color: "hsl(var(--chart-3))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[70, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="oxygenLevel" stroke="var(--color-oxygenLevel)" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
