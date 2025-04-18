import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Heart, Droplet, TreesIcon as Lungs } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-950 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-emerald-500" />
            <h1 className="text-xl font-bold">HealthTrack</h1>
          </div>
          <div className="space-x-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Monitor Your Health Metrics</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Track, analyze, and improve your health with our comprehensive monitoring system.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Heart className="h-8 w-8 text-red-500 mb-2" />
              <CardTitle>Heart Rate</CardTitle>
              <CardDescription>Monitor your heart rate and track changes over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Keep track of your resting heart rate and detect any abnormalities early.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Droplet className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Blood Pressure</CardTitle>
              <CardDescription>Record systolic and diastolic pressure readings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Maintain a log of your blood pressure readings to share with healthcare providers.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lungs className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle>Oxygen Levels</CardTitle>
              <CardDescription>Track your blood oxygen saturation levels.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Monitor oxygen levels to ensure your body is receiving adequate oxygen.</p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-950 mt-20 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 HealthTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
