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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Simule un chargement de 1 secondes

    return () => clearTimeout(loadingTimeout)
  }, [])

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
      className={`flex flex-col items-center rounded-lg p-1 sm:p-2 ${isLastHour ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}
    >
      <span className="text-base font-bold sm:text-xl lg:text-3xl">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-xs uppercase sm:text-sm">{unit}</span>
    </div>
  )

  if (isLoading) {
    return (
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl lg:text-3xl">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <svg
              aria-hidden="true"
              className="inline size-10 animate-spin fill-primary text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    )
  }

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
