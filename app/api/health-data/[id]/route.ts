import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import HealthData from "@/models/health-data"
import { auth } from "@/lib/auth-middleware"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Authenticate user
    const userId = await auth(request)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Connect to database
    await connectDB()

    // Find and delete health data record
    const healthData = await HealthData.findOne({ _id: id, userId })

    if (!healthData) {
      return NextResponse.json({ message: "Health data record not found" }, { status: 404 })
    }

    await HealthData.deleteOne({ _id: id, userId })

    return NextResponse.json({ message: "Health data record deleted successfully" })
  } catch (error) {
    console.error("Error deleting health data:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
