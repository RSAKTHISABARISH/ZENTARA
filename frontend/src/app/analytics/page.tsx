"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const contractsByCarrier = [
  { name: "FedEx", total: 45 },
  { name: "UPS", total: 32 },
  { name: "DHL", total: 28 },
  { name: "USPS", total: 15 },
  { name: "XPO", total: 10 },
];

const ruleDistribution = [
  { name: "Liability limits", value: 35 },
  { name: "Claim deadlines", value: 25 },
  { name: "Penalties", value: 20 },
  { name: "SLA targets", value: 15 },
  { name: "Packaging", value: 5 },
];

const COLORS = ['#0f172a', '#3b82f6', '#ef4444', '#f59e0b', '#10b981'];

const riskTrend = [
  { month: "Jan", risks: 12 },
  { month: "Feb", risks: 15 },
  { month: "Mar", risks: 8 },
  { month: "Apr", risks: 22 },
  { month: "May", risks: 14 },
  { month: "Jun", risks: 18 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Deep dive into your contract portfolio, rule distributions, and historical risk trends.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="glass col-span-4">
          <CardHeader>
            <CardTitle>Contracts by Carrier</CardTitle>
            <CardDescription>Volume of active agreements across providers</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contractsByCarrier} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass col-span-3">
          <CardHeader>
            <CardTitle>Rule Distribution</CardTitle>
            <CardDescription>Categorization of extracted clauses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ruleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ruleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass col-span-7">
          <CardHeader>
            <CardTitle>Risk Identification Trend</CardTitle>
            <CardDescription>Number of high-risk clauses identified over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                <Line type="monotone" dataKey="risks" stroke="currentColor" strokeWidth={2} dot={{ r: 4, fill: "currentColor" }} activeDot={{ r: 6 }} className="stroke-primary" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
