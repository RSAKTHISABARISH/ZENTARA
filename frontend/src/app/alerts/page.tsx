"use client";

import { AlertTriangle, Clock, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: 1,
    severity: "critical",
    title: "Impending Claim Deadline",
    description: "You have 3 days left to file a short-shipment claim under the Q3 FedEx SLA.",
    contract: "FedEx Standard Q3",
    actionRequired: "File Claim",
    icon: Clock
  },
  {
    id: 2,
    severity: "warning",
    title: "Volume Commitment Risk",
    description: "Current shipping volume is 15% below the monthly minimum required for the UPS Enterprise tier discount.",
    contract: "UPS Enterprise",
    actionRequired: "Review Volume",
    icon: AlertTriangle
  },
  {
    id: 3,
    severity: "critical",
    title: "Liability Limit Changed",
    description: "New addendum reduced standard liability from $100 to $50 per package.",
    contract: "DHL Global Express",
    actionRequired: "Acknowledge",
    icon: ShieldAlert
  },
  {
    id: 4,
    severity: "info",
    title: "Rate Increase Notice",
    description: "Annual 4.9% GRI (General Rate Increase) goes into effect in 45 days.",
    contract: "FedEx Standard",
    actionRequired: "View Impact",
    icon: AlertTriangle
  }
];

export default function AlertsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-destructive flex items-center gap-2">
          <AlertTriangle className="h-8 w-8" />
          Risk Alerts
        </h1>
        <p className="text-muted-foreground">
          Critical notifications regarding contract compliance, deadlines, and financial risks.
        </p>
      </div>

      <div className="grid gap-4 mt-6">
        {alerts.map((alert) => (
          <Card 
            key={alert.id} 
            className={`glass border-l-4 ${
              alert.severity === 'critical' ? 'border-l-destructive bg-destructive/5' : 
              alert.severity === 'warning' ? 'border-l-amber-500 bg-amber-500/5' : 
              'border-l-blue-500 bg-blue-500/5'
            }`}
          >
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-background/80">{alert.contract}</Badge>
                  {alert.severity === 'critical' && <Badge variant="destructive">Critical Action Needed</Badge>}
                </div>
                <CardTitle className="text-xl flex items-center gap-2 mt-2">
                  <alert.icon className={`h-5 w-5 ${
                    alert.severity === 'critical' ? 'text-destructive' : 
                    alert.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'
                  }`} />
                  {alert.title}
                </CardTitle>
              </div>
              <Button size="sm" variant={alert.severity === 'critical' ? "default" : "outline"}>
                {alert.actionRequired}
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mt-2">
                {alert.description}
              </p>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center justify-center p-8 mt-4 border border-dashed rounded-lg text-muted-foreground">
          <div className="flex flex-col items-center gap-2 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 opacity-50" />
            <p>No other active alerts found in your contracts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
