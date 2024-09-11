"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CountDown({
  deadline,
  title,
}: {
  deadline: Date
  title: string
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = deadline.getTime() - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [deadline])

  const isLastHour =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 60

  const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
    <div
      className={`flex flex-col items-center rounded-lg p-2 ${isLastHour ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}
    >
      <span className="text-xl font-bold lg:text-3xl">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-xs uppercase">{unit}</span>
    </div>
  )

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-xl lg:text-3xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4">
          <TimeUnit value={timeLeft.days} unit="days" />
          <TimeUnit value={timeLeft.hours} unit="hours" />
          <TimeUnit value={timeLeft.minutes} unit="minutes" />
          <TimeUnit value={timeLeft.seconds} unit="seconds" />
        </div>
      </CardContent>
    </Card>
  )
}
