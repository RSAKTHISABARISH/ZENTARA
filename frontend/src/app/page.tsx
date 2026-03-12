"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  DollarSign, 
  ArrowUpRight, 
  Boxes, 
  MapPin, 
  Activity,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const performanceStats = [
  { title: "Avg. Delivery Time", value: "2.4 Days", icon: Clock, trend: "-12% this week", color: "text-blue-600" },
  { title: "Active Shipments", value: "1,420", icon: Boxes, trend: "+8.4%", color: "text-emerald-600" },
  { title: "Risk Level", value: "Low", icon: ShieldAlert, trend: "Stable", color: "text-amber-600" },
  { title: "Cost Savings", value: "$42.5k", icon: DollarSign, trend: "+15% YoY", color: "text-violet-600" },
];

const shippingAlerts = [
  { id: 1, route: "Shanghai ➔ Long Beach", status: "Delayed", delay: "48h", risk: "high", reason: "Port Congestion" },
  { id: 2, route: "Rotterdam ➔ New York", status: "On Track", delay: "0h", risk: "low", reason: "Weather Clear" },
  { id: 3, route: "Singapore ➔ Mumbai", status: "At Risk", delay: "12h", risk: "medium", reason: "Customs Backlog" },
];

export default function ZentaraDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary">ZENTARA Intelligence</h1>
          <p className="text-muted-foreground text-lg">
            Elite real-time monitoring & AI-driven predictive insights.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium bg-background shadow-sm border-primary/20">
            <Activity className="h-3.5 w-3.5 mr-2 text-primary" />
            System Live
          </Badge>
          <Badge className="px-4 py-1.5 text-sm font-medium shadow-md">
            v2.4 AI Model
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {performanceStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-elegant hover:shadow-hover transition-all duration-300 overflow-hidden group">
              <div className="h-1 w-full bg-primary/10 absolute top-0 left-0 group-hover:bg-primary transition-colors" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-background border shadow-sm ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-500">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="md:col-span-8 border-none shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">Predictive Route Analytics</CardTitle>
              <CardDescription>AI simulation of current transit high-risk zones</CardDescription>
            </div>
            <button className="text-primary text-sm font-bold flex items-center hover:underline">
              Full Report <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="relative h-[400px] w-full bg-slate-50 border rounded-xl overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
               {/* Visual Placeholder for Map/AI Graph */}
               <div className="relative text-center space-y-4">
                 <div className="flex justify-center -space-x-4">
                    {[1,2,3,4].map(idx => (
                      <div key={idx} className="h-12 w-12 rounded-full border-4 border-white bg-primary/10 flex items-center justify-center animate-pulse" style={{ animationDelay: `${idx * 0.5}s` }}>
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                    ))}
                 </div>
                 <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Global Logistics AI Grid Active</p>
                 <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-white p-3 rounded-lg shadow-sm border text-left">
                       <p className="text-[10px] uppercase font-bold text-muted-foreground">Highest Delay Probability</p>
                       <p className="text-sm font-black text-destructive">Panama Canal (84%)</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border text-left">
                       <p className="text-[10px] uppercase font-bold text-muted-foreground">Optimal Alternative</p>
                       <p className="text-sm font-black text-emerald-600">Suez Route (+2.1d)</p>
                    </div>
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-4 space-y-6">
          <Card className="border-none shadow-elegant bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">AI Cost Optimizer</CardTitle>
              <CardDescription className="text-primary-foreground/70">Potential monthly savings identified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-black">$12,450.00</div>
              <div className="pt-2">
                <button className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center">
                  Implement Recommendations
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Critical Logistics Alerts</CardTitle>
              <CardDescription>Requiring immediate personnel attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shippingAlerts.map((alert, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 border group hover:bg-white hover:shadow-sm transition-all">
                    <div className="space-y-1">
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">{alert.route}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                         <span className={`h-2 w-2 rounded-full mr-2 ${alert.risk === 'high' ? 'bg-destructive' : 'bg-amber-500'}`} />
                         {alert.reason}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black ${alert.risk === 'high' ? 'text-destructive' : 'text-amber-600'}`}>+{alert.delay}</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">EST. Delay</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
