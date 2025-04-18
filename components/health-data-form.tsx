"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addHealthData } from "@/lib/api-service"

const formSchema = z.object({
  heartRate: z.coerce
    .number()
    .min(30, {
      message: "Heart rate must be at least 30 bpm.",
    })
    .max(220, {
      message: "Heart rate must be less than 220 bpm.",
    }),
  bloodPressureSystolic: z.coerce
    .number()
    .min(70, {
      message: "Systolic pressure must be at least 70 mmHg.",
    })
    .max(250, {
      message: "Systolic pressure must be less than 250 mmHg.",
    }),
  bloodPressureDiastolic: z.coerce
    .number()
    .min(40, {
      message: "Diastolic pressure must be at least 40 mmHg.",
    })
    .max(150, {
      message: "Diastolic pressure must be less than 150 mmHg.",
    }),
  oxygenLevel: z.coerce
    .number()
    .min(70, {
      message: "Oxygen level must be at least 70%.",
    })
    .max(100, {
      message: "Oxygen level must be at most 100%.",
    }),
  notes: z.string().optional(),
})

type HealthDataFormProps = {
  onSuccess: () => void
}

export default function HealthDataForm({ onSuccess }: HealthDataFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heartRate: 70,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      oxygenLevel: 98,
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await addHealthData({
        heartRate: values.heartRate,
        bloodPressureSystolic: values.bloodPressureSystolic,
        bloodPressureDiastolic: values.bloodPressureDiastolic,
        oxygenLevel: values.oxygenLevel,
        notes: values.notes || "",
        date: new Date().toISOString(),
      })

      form.reset()
      onSuccess()
    } catch (error) {
      console.error("Failed to add health data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heart Rate (bpm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Normal resting heart rate is 60-100 bpm.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="bloodPressureSystolic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure - Systolic (mmHg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodPressureDiastolic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure - Diastolic (mmHg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Normal blood pressure is around 120/80 mmHg.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="oxygenLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oxygen Level (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Normal oxygen saturation is 95-100%.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Optional notes about your measurements.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Health Data"}
        </Button>
      </form>
    </Form>
  )
}
