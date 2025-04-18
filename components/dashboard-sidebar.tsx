"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, BarChart2, Calendar, Heart, Home, PlusCircle, Settings, User } from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Add Health Data",
      href: "/dashboard?tab=add-data",
      icon: PlusCircle,
    },
    {
      name: "History",
      href: "/dashboard?tab=history",
      icon: Calendar,
    },
    {
      name: "Analytics",
      href: "/dashboard?tab=charts",
      icon: BarChart2,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 md:hidden">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-emerald-500" />
          <span className="font-bold text-lg">HealthTrack</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-50"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-emerald-500" />
            <div>
              <h4 className="font-medium">Health Tips</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Stay hydrated and active!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
