"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAllVisits } from "@/app/features/admin/api/use-all-visits";
import { Loader } from "lucide-react";

export const description = "An interactive bar chart that tracks the total visitors";


function generateMonthDates(year: number, month: number) {
  const dates = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(year, month, day).toISOString().slice(0, 10);
    dates.push(dateStr);
  }
  return dates;
}


const chartConfig = {
  totalVisit: {
    label: "Total Visits",
    color: "var(--chart-2)", // pick any color you like
  },
} satisfies ChartConfig;

export function DashboardChart() {
const { data: visits, isLoading } = useAllVisits();

  // Generate dates for July 2025 (month is 0-based, so 6 = July)
  const monthDates = React.useMemo(() => generateMonthDates(2025, 6), []);

  // Map visits to a date->count map
 const visitsByDate = React.useMemo(() => {
  const map = new Map<string, number>();
  if (!visits) return map;
  for (const visit of visits) {
    const visitDate = new Date(visit.visitTime).toISOString().slice(0, 10);
    const prevCount = map.get(visitDate) ?? 0;
    map.set(visitDate, prevCount + 1); // increment count for that date
  }
  return map;
}, [visits]);

  // Compose data for the chart: each date with totalVisit or 0
  const chartData = React.useMemo(() => {
    return monthDates.map(date => ({
      date,
      totalVisit: visitsByDate.get(date) ?? 0,
    }));
  }, [monthDates, visitsByDate]);

  const totalVisit = React.useMemo(() => {
    return chartData.reduce((acc, day) => acc + day.totalVisit, 0);
  }, [chartData]);

  if (isLoading) return(
        <div className="flex flex-col h-full gap-y-4 items-center justify-center">
         <p className="text-lg font-bold">Loading</p>
         <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
  );
  return (
    <Card className="p-0 m-4">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Page Sessions</CardTitle>
          <CardDescription>
            Showing total visitors for the last 1 month
          </CardDescription>
        </div>
        <div className="flex border-l">
          <div className="relative z-30 flex flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Total Visit</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {totalVisit.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="totalVisit"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="totalVisit" fill={`var(--color-totalVisit)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
