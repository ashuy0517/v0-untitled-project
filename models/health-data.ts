import mongoose from "mongoose"

const healthDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
    },
    bloodPressureSystolic: {
      type: Number,
      required: true,
    },
    bloodPressureDiastolic: {
      type: Number,
      required: true,
    },
    oxygenLevel: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export default mongoose.models.HealthData || mongoose.model("HealthData", healthDataSchema)
