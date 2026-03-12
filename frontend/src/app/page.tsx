"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Search, 
  Database, 
  Layers,
  Sparkles,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutSection = () => (
  <div className="space-y-12 pb-20">
    {/* Hero Section */}
    <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 md:p-16 text-white shadow-2xl border border-white/10">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />
      
      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-primary text-primary-foreground font-bold px-4 py-1">Mission Control</Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            ZENTARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Intelligence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8">
            The world's most advanced AI-driven logistics ecosystem. We leverage state-of-the-art Retrieval-Augmented Generation to transform complex supply chain data into actionable intelligence.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 group">
              Explore Ecosystem <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-8 py-3 rounded-xl transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>

    {/* AI Agent RAG System Section */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
          <Cpu className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-black tracking-tight">The RAG Core: <span className="text-primary italic">Neural Retrieval</span></h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          ZENTARA's AI Agent isn't just a chatbot—it's a sophisticated RAG (Retrieval-Augmented Generation) system designed for precision. It bridges the gap between static LLM knowledge and your enterprise's dynamic logistics documents.
        </p>
        
        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <Zap className="h-3 w-3" />
            </div>
            <div>
              <h4 className="font-bold">Gemini 1.5 Pro Engine</h4>
              <p className="text-sm text-muted-foreground">Utilizing ultra-long context windows for holistic contract understanding.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
              <Database className="h-3 w-3" />
            </div>
            <div>
              <h4 className="font-bold">ChromaDB Vector Store</h4>
              <p className="text-sm text-muted-foreground">High-dimensional semantic indexing for millisecond retrieval of critical clauses.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
              <Globe className="h-3 w-3" />
            </div>
            <div>
              <h4 className="font-bold">Live Web Integration</h4>
              <p className="text-sm text-muted-foreground">Cross-referencing internal data with real-time global logistics terms and news.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-violet-500 opacity-20 blur-2xl rounded-[3rem]" />
        <Card className="relative border-none shadow-2xl overflow-hidden bg-slate-900 text-white">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <Badge variant="outline" className="text-xs border-white/20 text-white/50">rag_pipeline.py</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="p-6 text-sm font-mono overflow-x-hidden">
              <code className="text-blue-400">def</code> <code className="text-white">ask_contract_question</code>(question, vectorstore):{"\n"}
              {"  "}context = vectorstore.search(question){"\n"}
              {"  "}prompt = f<code className="text-amber-300">"Using this context: {"{"}context{"}"}"</code>{"\n"}
              {"  "}response = gemini.generate(prompt){"\n"}
              {"  "}<code className="text-violet-400">return</code> response
            </pre>
            <div className="bg-primary/20 p-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Agent Optimized</span>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Key Features Overview */}
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-black mb-4">Core Ecosystem Features</h2>
        <p className="text-muted-foreground">Beyond standard tracking, we provide a full-spectrum AI intelligence suite.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Predictive Insights", icon: Zap, desc: "Early warning systems for customs and port delays." },
          { title: "Risk Safeguard", icon: ShieldCheck, desc: "Automated liability analysis for every carrier contract." },
          { title: "Global Mesh", icon: Globe, desc: "Unified dashboard for multi-modal international transit." }
        ].map((item, i) => (
          <Card key={i} className="border-none shadow-elegant hover:scale-[1.02] transition-all bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                <item.icon className="h-6 w-6" />
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default function ZentaraAboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 pt-4">
      <AboutSection />
    </div>
  );
}
