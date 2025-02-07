"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, PolarRadiusAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { skill: "Programming", value: 186 },
  { skill: "Design", value: 305 },
  { skill: "Marketing", value: 237 },
  { skill: "Management", value: 273 },
  { skill: "Data Analysis", value: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RadarComponent() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Most Demanded Skills</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData} outerRadius={90} width={500} height={500}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fontSize: 9,
                textAnchor: "middle",
              }}
              tickFormatter={(value) => value}
            />
            <PolarRadiusAxis angle={30} domain={[0, 400]} />
            <Radar
              dataKey="value"
              stroke="var(--color-desktop)"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June {new Date().getFullYear()}
        </div>
      </CardFooter>
    </Card>
  )
}
