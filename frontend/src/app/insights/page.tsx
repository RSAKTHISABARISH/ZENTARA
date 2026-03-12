"use client";

import { motion } from "framer-motion";
import { ShieldAlert, FileSearch, ArrowRight, Gavel, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const extractedRules = [
  { 
    id: 1, 
    category: "Liability Limit", 
    contract: "FedEx Standard", 
    rule: "$100 per package without declared value.", 
    clauseRef: "Section 12.A",
    icon: ShieldAlert
  },
  { 
    id: 2, 
    category: "Claim Procedure", 
    contract: "FedEx Standard", 
    rule: "Must be filed within 21 days manually or via portal.", 
    clauseRef: "Section 15.C",
    icon: FileSearch
  },
  { 
    id: 3, 
    category: "Penalty Clause", 
    contract: "DHL Express", 
    rule: "No fuel surcharge waiver for shipments < 50kg.", 
    clauseRef: "Annex A.1",
    icon: Gavel
  },
  { 
    id: 4, 
    category: "Packaging Requirement", 
    contract: "UPS Enterprise", 
    rule: "Double-walled corrugated boxes required for items > 30lbs.", 
    clauseRef: "Packaging Guidelines v2",
    icon: FileCheck
  }
];

export default function InsightsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contract Insights</h1>
          <p className="text-muted-foreground">
            Structured rules and obligations extracted automatically from your active SLAs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardDescription>Rules Extracted</CardDescription>
            <CardTitle className="text-3xl">1,248</CardTitle>
          </CardHeader>
        </Card>
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardDescription>Documents Indexed</CardDescription>
            <CardTitle className="text-3xl">14</CardTitle>
          </CardHeader>
        </Card>
        <Card className="glass border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardDescription>High Risk Clauses</CardDescription>
            <CardTitle className="text-3xl text-destructive">8</CardTitle>
          </CardHeader>
        </Card>
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardDescription>Upcoming Renewals</CardDescription>
            <CardTitle className="text-3xl">2</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 pt-4 md:grid-cols-2">
        {extractedRules.map((rule, i) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass h-full hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-background/50">{rule.contract}</Badge>
                  <CardTitle className="text-xl flex items-center gap-2 mt-2">
                    <rule.icon className="h-5 w-5 text-primary" />
                    {rule.category}
                  </CardTitle>
                </div>
                <Badge variant="secondary">{rule.clauseRef}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium leading-tight py-4 text-foreground/90">
                  {rule.rule}
                </p>
              </CardContent>
              <CardFooter className="bg-muted/10 border-t py-3">
                <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-primary justify-between">
                  View Source Document
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
