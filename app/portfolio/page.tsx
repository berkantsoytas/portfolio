import Timeline from "@/components/Timeline";
import ProjectCard from "@/components/ProjectCard";
import { cookies } from "next/headers";

const experienceTR = [
  {
    period: "Oct 2021 — Jan 2026",
    title: "Software & Blockchain Engineer",
    subtitle: "Blokfield · Adana",
    description:
      "Node.js ve Go ile yüksek performanslı backend servisleri ve blokzincir altyapısı geliştirdim. EVM uyumlu blokzincirlerde Web3.js/Ethers.js ile otomatik trading ve arbitraj botları inşa ettim. Solidity akıllı kontratlar geliştirdim (token, DeFi). Redis ile önbellekleme, event-driven sistemler ve Kafka ile veri işleme hatları kurdum.",
  },
  {
    period: "Jul 2019 — Sep 2021",
    title: "Full Stack Developer (Intern)",
    subtitle: "Mentalsoft · Adana",
    description:
      "Kurumsal ERP ve B2B yazılım platformları geliştirdim. C# ve ASP.NET ile RESTful API'ler tasarladım. Microsoft SQL Server'da sorgu optimizasyonu ve indeksleme stratejileri uyguladım. React ve TypeScript ile önyüz geliştirdim.",
  },
];

const experienceEN = [
  {
    period: "Oct 2021 — Jan 2026",
    title: "Software & Blockchain Engineer",
    subtitle: "Blokfield · Adana",
    description:
      "Designed high-performance backend services using Node.js and Go for blockchain infrastructure and trading automation. Built automated trading and arbitrage bots interacting with EVM-compatible blockchains. Developed Solidity smart contracts for DeFi protocols. Improved performance with Redis caching, event-driven systems, and Kafka data pipelines.",
  },
  {
    period: "Jul 2019 — Sep 2021",
    title: "Full Stack Developer (Intern)",
    subtitle: "Mentalsoft · Adana",
    description:
      "Developed enterprise ERP and B2B software platforms. Designed RESTful APIs using C# and ASP.NET. Optimized MS SQL Server through indexing and query tuning. Built frontend applications using React and TypeScript.",
  },
];

const educationTR = [
  {
    period: "2016 — 2018",
    title: "Bilgisayar Programcılığı (Ön Lisans)",
    subtitle: "Üniversite · Adana",
    description:
      "2 yıllık bilgisayar programcılığı programı. Gerisi tamamen alaylı — kendi kendine öğrenme, open source projeler ve saha deneyimi ile şekillendi.",
  },
];

const educationEN = [
  {
    period: "2016 — 2018",
    title: "Computer Programming (Associate Degree)",
    subtitle: "University · Adana",
    description:
      "2-year computer programming program. The rest is self-taught — shaped by open source, hands-on experience, and building real systems.",
  },
];

const skillCategories = [
  {
    title: "Languages",
    items: ["Go", "TypeScript", "JavaScript", "Rust", "Solidity", "C#", "Python"],
  },
  {
    title: "Backend & Systems",
    items: ["Node.js", "Express.js", "NestJS", "ASP.NET", "Microservices", "REST APIs", "Distributed Systems", "Event-Driven Architecture"],
  },
  {
    title: "Blockchain & Web3",
    items: ["Smart Contracts", "DeFi Protocols", "EVM", "Web3.js", "Ethers.js", "Blockchain Bots", "On-chain Data"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "MSSQL", "SQLite", "Redis", "Database Design", "Query Optimization"],
  },
  {
    title: "Infrastructure & DevOps",
    items: ["Docker", "Kubernetes", "CI/CD", "Git", "Linux", "Nginx"],
  },
  {
    title: "Data & Messaging",
    items: ["Kafka", "RabbitMQ", "Event Streaming", "Background Workers"],
  },
  {
    title: "AI & Automation",
    items: ["AI Agents", "LLM Integrations", "Automation Scripting"],
  },
];

const projects = [
  {
    name: "steem-sbd-arbitrage-pipeline",
    description:
      "Cross-chain arbitrage system: automated pipeline that withdraws SBD from Steem blockchain, sells on Upbit exchange, buys STEEM, and transfers back. Increased SBD market supply through systematic arbitrage. Event-driven architecture, real-time price monitoring, automated execution.",
    tags: ["Steem", "Node.js", "Event-Driven", "Arbitrage", "Automation"],
  },
  {
    name: "robinia-swap",
    description:
      "DeFi swap protocol with automated market maker (AMM). Custom liquidity pool management, swap routing, and yield farming mechanisms. Built for EVM-compatible chains with Solidity smart contracts.",
    tags: ["Solidity", "DeFi", "EVM", "AMM", "Smart Contracts"],
  },
  {
    name: "pokemon-go-blockchain",
    description:
      "Blockchain-powered collectible card game inspired by Pokemon Go. Cards are NFTs with upgrade mechanics — combine, evolve, and trade. On-chain metadata, breeding mechanics, and marketplace integration.",
    tags: ["Solidity", "NFT", "GameFi", "EVM", "IPFS"],
  },
  {
    name: "walk-to-earn",
    description:
      "Gamified fitness app with blockchain rewards. Users earn project tokens by walking. Custom ERC-20 token with liquidity pool on DEX. High market cap with sustainable tokenomics. Location verification and anti-cheat systems.",
    tags: ["Solidity", "Tokenomics", "DeFi", "Liquidity", "Mobile"],
  },
  {
    name: "blockchain-indexer",
    description:
      "Scalable microservice for blockchain data ingestion, event indexing, and transaction automation pipelines. Kafka-based event streaming. Handles millions of events daily with sub-second latency.",
    tags: ["Node.js", "Kafka", "Redis", "PostgreSQL", "Docker"],
  },
  {
    name: "mempool-monitor",
    description:
      "Real-time mempool transaction monitoring for EVM chains. Tracks pending transactions, detects MEV opportunities, streams data to analytics pipeline via WebSocket.",
    tags: ["Go", "Web3.js", "EVM", "Redis", "WebSocket"],
  },
  {
    name: "cross-chain-bridge",
    description:
      "Custom blockchain bridge infrastructure connecting multiple heterogeneous chains. Enables asset and data transfer between EVM and non-EVM networks. Built with validator set consensus, on-chain light client verification, and relayer node network for cross-chain message passing.",
    tags: ["Solidity", "Go", "Bridge", "Cross-Chain", "Validators"],
  },
  {
    name: "steem-sidechain-network",
    description:
      "Sustainable sidechain solution for blockchains without native sidechain support (Steem). Custom sidechain with EVM compatibility enabling smart contracts, custom dApps, and DeFi protocols. Users deployed custom contracts and built applications tethered to the main chain. Featured custom bridge, block production, and tokenomics.",
    tags: ["Go", "Sidechain", "EVM", "Infrastructure", "Custom"],
  },
];

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? "tr") as "tr" | "en";

  const dict = locale === "tr"
    ? (await import("@/lib/dictionaries/tr.json")).default
    : (await import("@/lib/dictionaries/en.json")).default;

  const experience = locale === "tr" ? experienceTR : experienceEN;
  const education = locale === "tr" ? educationTR : educationEN;

  return (
    <div className="py-8">
      <div className="mb-12">
        <p className="font-mono text-sm text-foreground-dim mb-2">
          <span className="text-foreground-dim">$</span> {dict["portfolio.subtitle"]}
        </p>
        <h1 className="text-2xl font-mono font-semibold text-foreground">
          {dict["portfolio.title"]}
        </h1>
      </div>

      {/* Contact card — terminal style */}
      <div className="mb-12 rounded-lg border border-border overflow-hidden">
        <div className="px-4 py-2 bg-surface-alt/50 border-b border-border">
          <span className="text-xs font-mono text-foreground-dim">~/.contact</span>
        </div>
        <div className="p-4 font-mono text-xs space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-foreground-dim w-16 shrink-0">email</span>
            <a href="mailto:mailtoberkant@gmail.com" className="text-foreground hover:opacity-70 transition-opacity">
              mailtoberkant@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-foreground-dim w-16 shrink-0">github</span>
            <a href="https://github.com/berkantsoytas" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-70 transition-opacity">
              github.com/berkantsoytas
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-foreground-dim w-16 shrink-0">linkedin</span>
            <a href="https://linkedin.com/in/berkantsoytas" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-70 transition-opacity">
              linkedin.com/in/berkantsoytas
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-foreground-dim w-16 shrink-0">languages</span>
            <span className="text-foreground-dim">
              TR: native · EN: fluent (read/write),{" "}
              <span className="text-foreground-dim/60" title="Speaking skills not found">speaking: 404</span>
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-border mt-2">
            <span className="text-foreground-dim w-16 shrink-0">status</span>
            <span className="text-green-400 font-medium">● available for hire</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-12">
          <Timeline items={experience} title={dict["portfolio.experience"]} />
          <Timeline items={education} title={dict["portfolio.education"]} />
        </div>

        <div className="lg:col-span-2 space-y-10">
          {/* Skills — categorized */}
          <div>
            <h3 className="font-mono text-sm font-medium text-foreground mb-6">
              # {dict["portfolio.skills"]}
            </h3>
            <div className="space-y-5">
              {skillCategories.map((cat) => (
                <div key={cat.title}>
                  <h4 className="font-mono text-[11px] text-foreground-dim uppercase tracking-wider mb-2">
                    {cat.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-md border border-border text-foreground-dim bg-surface-alt/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-mono text-sm font-medium text-foreground mb-6">
              # {dict["portfolio.projects"]}
            </h3>
            <div className="space-y-3">
              {projects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
