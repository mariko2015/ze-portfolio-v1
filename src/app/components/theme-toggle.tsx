"use client"

import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <span aria-hidden="true" className="inline-block h-10 w-10" />

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  return (
    <Button
      className="rounded-full bg-transparent w-10 h-10 z-50"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? (
        <>
          <Sun
            className="h-[14px] w-[14px] rotate-0 scale-100 transition-all"
            color="currentColor"
          />
          <span className="sr-only">Switch to dark mode</span>
        </>
      ) : (
        <>
          <Moon
            className="h-[14px] w-[14px] rotate-0 scale-100 transition-all"
            color="currentColor"
          />
          <span className="sr-only">Switch to light mode</span>
        </>
      )}
    </Button>
  )
}
