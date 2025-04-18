import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import HealthData from "@/models/health-data"
import { auth } from "@/lib/auth-middleware"

export async function GET(request: Request) {
  try {
    // Authenticate user
    const userId = await auth(request)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectDB()

    // Get health data for user
    const healthData = await HealthData.find({ userId }).sort({ date: -1 }).lean()

    return NextResponse.json(healthData)
  } catch (error) {
    console.error("Error fetching health data:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Authenticate user
    const userId = await auth(request)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const data = await request.json()

    // Connect to database
    await connectDB()

    // Create new health data record
    const healthData = new HealthData({
      userId,
      heartRate: data.heartRate,
      bloodPressureSystolic: data.bloodPressureSystolic,
      bloodPressureDiastolic: data.bloodPressureDiastolic,
      oxygenLevel: data.oxygenLevel,
      notes: data.notes,
      date: data.date,
    })

    await healthData.save()

    return NextResponse.json(healthData, { status: 201 })
  } catch (error) {
    console.error("Error adding health data:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
