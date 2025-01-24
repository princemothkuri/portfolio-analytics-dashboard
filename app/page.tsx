"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { addMonths, isWithinInterval, parseISO, startOfMonth, endOfMonth } from "date-fns";

// Chart components with proper default parameters
const CustomXAxis = ({
  dataKey = "name",
  tick = { fontSize: 12 },
  padding = { left: 20, right: 20 },
  ...props
}) => (
  <XAxis
    dataKey={dataKey}
    tick={tick}
    padding={padding}
    {...props}
  />
);

const CustomYAxis = ({
  width = 80,
  tick = { fontSize: 12 },
  tickFormatter = (value: any) => `${value}`,
  ...props
}) => (
  <YAxis
    width={width}
    tick={tick}
    tickFormatter={tickFormatter}
    {...props}
  />
);

// Sample data with actual Date objects
const portfolioData = [
  { date: "2025-01", value: 10000 },
  { date: "2025-02", value: 12000 },
  { date: "2025-03", value: 11500 },
  { date: "2025-04", value: 13000 },
  { date: "2025-05", value: 14500 },
  { date: "2025-06", value: 14000 },
].map(item => ({
  ...item,
  dateObj: parseISO(`${item.date}-01`),
}));

const allocationData = [
  { name: "Stocks", value: 45 },
  { name: "Bonds", value: 25 },
  { name: "Crypto", value: 15 },
  { name: "Real Estate", value: 10 },
  { name: "Cash", value: 5 },
];

const strategyData = [
  { name: "Value Investing", roi: 15 },
  { name: "Growth Stocks", roi: 22 },
  { name: "Dividend Strategy", roi: 12 },
  { name: "Index Funds", roi: 18 },
];

const marketUpdates = [
  { date: "2025-01-15", news: "Market rallied by 2% on positive economic data", type: "positive" },
  { date: "2025-01-14", news: "Tech sector experiences minor correction", type: "negative" },
  { date: "2025-01-13", news: "New regulations boost fintech stocks", type: "positive" },
  { date: "2025-01-12", news: "Global markets show strong momentum", type: "positive" },
].map(item => ({
  ...item,
  dateObj: parseISO(item.date),
}));

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState("all");

  // Calculate date range based on selected time range
  const dateRange = useMemo(() => {
    if (!selectedDate) return null;

    const end = endOfMonth(selectedDate);
    let start;

    switch (timeRange) {
      case "1m":
        start = startOfMonth(selectedDate);
        break;
      case "6m":
        start = startOfMonth(addMonths(selectedDate, -6));
        break;
      case "1y":
        start = startOfMonth(addMonths(selectedDate, -12));
        break;
      default: // "all"
        return null;
    }

    return { start, end };
  }, [selectedDate, timeRange]);

  // Filter data based on date range
  const filteredPortfolioData = useMemo(() => {
    if (!dateRange) return portfolioData;

    return portfolioData.filter(item =>
      isWithinInterval(item.dateObj, dateRange)
    );
  }, [dateRange]);

  // Calculate metrics based on filtered data
  const metrics = useMemo(() => {
    const latestValue = filteredPortfolioData[filteredPortfolioData.length - 1]?.value || 0;
    const previousValue = filteredPortfolioData[filteredPortfolioData.length - 2]?.value || 0;
    const dailyPL = latestValue - previousValue;
    const winRate = Math.round((filteredPortfolioData.filter(item =>
      item.value > (portfolioData[portfolioData.indexOf(item) - 1]?.value || 0)
    ).length / filteredPortfolioData.length) * 100);

    return {
      totalValue: latestValue,
      dailyPL,
      winRate
    };
  }, [filteredPortfolioData]);

  // Filter market updates
  const filteredMarketUpdates = useMemo(() => {
    if (!dateRange) return marketUpdates;

    return marketUpdates.filter(item =>
      isWithinInterval(item.dateObj, dateRange)
    );
  }, [dateRange]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Portfolio Analytics</h1>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1m">Last Month</SelectItem>
              </SelectContent>
            </Select>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
              </div>
              <Badge variant="secondary">Portfolio</Badge>
            </div>
            <p className="text-2xl font-bold mt-2">${metrics.totalValue.toLocaleString()}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {metrics.dailyPL >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                )}
                <h3 className="text-sm font-medium text-muted-foreground">Daily P&L</h3>
              </div>
              <Badge variant="secondary">Today</Badge>
            </div>
            <p className={`text-2xl font-bold mt-2 ${metrics.dailyPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.dailyPL >= 0 ? '+' : ''}{metrics.dailyPL.toLocaleString()}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Win Rate</h3>
              </div>
              <Badge variant="secondary">Overall</Badge>
            </div>
            <p className="text-2xl font-bold mt-2">{metrics.winRate}%</p>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="allocation" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Allocation
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Strategies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Portfolio Growth</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredPortfolioData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <CustomXAxis
                      dataKey="date"
                      allowDuplicatedCategory={false}
                    />
                    <CustomYAxis
                      tickFormatter={(value: number) => `$${value}`}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Strategy Performance</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={strategyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <CustomXAxis
                      dataKey="name"
                      interval={0}
                    />
                    <CustomYAxis
                      tickFormatter={(value: number) => `${value}%`}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="roi"
                      fill="hsl(var(--chart-1))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card className="col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Strategy Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>CAGR</TableHead>
                    <TableHead>Drawdown</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Value Investing</TableCell>
                    <TableCell className="text-green-500">+15%</TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell className="text-red-500">-5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Growth Stocks</TableCell>
                    <TableCell className="text-green-500">+22%</TableCell>
                    <TableCell>18%</TableCell>
                    <TableCell className="text-red-500">-8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dividend Strategy</TableCell>
                    <TableCell className="text-green-500">+12%</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell className="text-red-500">-3%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Market Updates</h3>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {filteredMarketUpdates.map((update, index) => (
                    <div key={index} className="flex flex-col gap-1 pb-4 border-b last:border-0">
                      <div className="flex items-center justify-between">
                        <Badge variant={update.type === 'positive' ? 'default' : 'destructive'}>
                          {update.type === 'positive' ? 'Positive' : 'Negative'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{update.date}</span>
                      </div>
                      <p className="text-sm">{update.news}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}