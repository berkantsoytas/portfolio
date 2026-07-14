import Timeline from "@/components/Timeline";
import ProjectCard from "@/components/ProjectCard";
import { cookies } from "next/headers";

const experienceTR = [
  {
    period: "Oct 2021 — Jan 2026",
    title: "Software & Blockchain Developer",
    subtitle: "Blokfield · Remote (Güney Kore)",
    description:
      "Web ve mobil projeler (gerçek zamanlı etkileşimli uygulamalar dahil) için ölçeklenebilir backend altyapıları tasarladım ve inşa ettim — karmaşık durum senkronizasyonu, yüksek eşzamanlılık veri akışı ve güvenilir API performansına odaklandım. Blokzincir entegre uygulamalar için backend servisleri ve otomasyon platformları geliştirdim. Teslimat süreleri, sürdürülebilirlik ve operasyonel yük temelinde monolitik ve mikroservis yapıları arasındaki mimari trade-off'ları değerlendirdim. Kafka ve Redis ile background worker'lar ve event-driven veri işleme hatları kurdum. Stratejik veritabanı tasarımı, sorgu optimizasyonu ve Node.js/Go'da eşzamanlılık yönetimi ile backend performansını optimize ettim. Merkezi protokoller için akıllı kontratlar geliştirdim ve bunları sağlam backend API'lerine güvenli şekilde bağladım.",
  },
  {
    period: "Jul 2019 — Sep 2021",
    title: "Full Stack Developer (Intern)",
    subtitle: "Mentalsoft · Adana, TR",
    description:
      "Katmanlı mimari ve sürdürülebilir kod odaklı olarak ASP.NET ve C# ile kurumsal ERP yazılımı için backend servisleri ve REST API'leri geliştirdim. Sorguları yeniden yapılandırma ve indeksleme stratejilerini iyileştirme yoluyla Microsoft SQL Server veritabanı performansını optimize ettim. Karmaşık iş mantığı ve kurumsal entegrasyonlar uygulayarak çeşitli müşteri dağıtımlarında sistem kararlılığını sağladım.",
  },
];

const experienceEN = [
  {
    period: "Oct 2021 — Jan 2026",
    title: "Software & Blockchain Developer ",
    subtitle: "Blokfield · Remote (South Korea)",
    description:
      "Designed and built scalable backend infrastructures for web and mobile projects (including real-time interactive applications), focusing on complex state synchronization, high-concurrency data flow, and reliable API performance. Developed backend services and automation platforms for blockchain-integrated applications. Evaluated architectural trade-offs, selecting monolithic or microservice structures based on delivery timelines, maintainability, and operational overhead. Implemented background workers and event-driven data pipelines using Kafka and Redis to handle asynchronous workloads and reduce latency. Optimized backend performance through strategic database design, query tuning, and concurrency management in Node.js and Go. Engineered and integrated smart contracts for decentralized protocols, connecting them securely to robust backend APIs.",
  },
  {
    period: "Jul 2019 — Sep 2021",
    title: "Full Stack Developer (Intern)",
    subtitle: "Mentalsoft · Adana, TR",
    description:
      "Developed backend services and REST APIs for enterprise ERP software using ASP.NET and C#, focusing on layered architecture and maintainable code. Optimized Microsoft SQL Server database performance by restructuring queries and improving indexing strategies. Implemented complex business logic and enterprise integrations, ensuring system stability across diverse client deployments.",
  },
];

const educationTR = [
  {
    period: "Sept 2021 — June 2023",
    title: "Bilgisayar Programcılığı (Ön Lisans)",
    subtitle: "Çukurova Üniversitesi · Adana, TR",
    description:
      "2 yıllık bilgisayar programcılığı programı. Gerisi tamamen alaylı — kendi kendine öğrenme, open source projeler ve saha deneyimi ile şekillendi.",
  },
];

const educationEN = [
  {
    period: "Sept 2021 — June 2023",
    title: "Computer Programming (Associate Degree)",
    subtitle: "Cukurova University · Adana, TR",
    description:
      "2-year computer programming program. The rest is self-taught — shaped by open source, hands-on experience, and building real systems.",
  },
];

const skillCategories = [
  {
    key: "skill_languages",
    title: "Languages",
    items: [
      "Node.js",
      "TypeScript",
      "Go",
      "Rust",
      "C#",
      "Python",
      "Solidity",
      "JavaScript",
    ],
  },
  {
    key: "skill_backend",
    title: "Backend & Systems",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "ASP.NET",
      "REST APIs",
      "WebSockets",
      "JWT",
      "OAuth",
      "Clean Architecture",
      "DDD",
      "MVC",
      "Microservices",
      "Distributed Systems",
      "Event-Driven Architecture",
    ],
  },
  {
    key: "skill_blockchain",
    title: "Blockchain & Web3",
    items: [
      "Smart Contracts",
      "DeFi Protocols",
      "EVM",
      "Web3.js",
      "Ethers.js",
      "Blockchain Bots",
      "On-chain Data",
    ],
  },
  {
    key: "skill_databases",
    title: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "Microsoft SQL Server",
      "MSSQL",
      "MongoDB",
      "SQLite",
      "Redis",
      "Database Design",
      "Query Optimization",
    ],
  },
  {
    key: "skill_devops",
    title: "Infrastructure & DevOps",
    items: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "Git",
      "Linux",
      "Nginx",
      "GitHub",
    ],
  },
  {
    key: "skill_messaging",
    title: "Data & Messaging",
    items: ["Kafka", "RabbitMQ", "Event Streaming", "Background Workers"],
  },
  {
    key: "skill_ai",
    title: "AI & Automation",
    items: ["AI Agents", "LLM Integrations", "Automation Scripting"],
  },
];

const projectsEN = [
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

const projectsTR = [
  {
    name: "steem-sbd-arbitrage-pipeline",
    description:
      "Cross-chain arbitraj sistemi: Steem blokzincirinden SBD çeken, Upbit borsasında satan, STEEM alıp geri transfer eden otomatize pipeline. Event-driven mimari, gerçek zamanlı fiyat takibi, otomatik çalıştırma.",
    tags: ["Steem", "Node.js", "Event-Driven", "Arbitrage", "Automation"],
  },
  {
    name: "robinia-swap",
    description:
      "Otomatik market maker (AMM) ile DeFi swap protokolü. Özel likidite havuzu yönetimi, swap routing ve yield farming mekanizmaları. EVM uyumlu zincirler için Solidity akıllı kontratlarla inşa edildi.",
    tags: ["Solidity", "DeFi", "EVM", "AMM", "Smart Contracts"],
  },
  {
    name: "pokemon-go-blockchain",
    description:
      "Pokemon Go esinli blokzincir tabanlı koleksiyon kart oyunu. NFT kartlar, geliştirme mekanikleri (birleştirme, evrim, takas), on-chain metadata, yetiştirme ve marketplace entegrasyonu.",
    tags: ["Solidity", "NFT", "GameFi", "EVM", "IPFS"],
  },
  {
    name: "walk-to-earn",
    description:
      "Blokzincir ödüllü gamified fitness uygulaması. Kullanıcılar yürüyerek token kazanır. DEX'te likidite havuzu olan özel ERC-20 token. Konum doğrulama ve anti-cheat sistemleri.",
    tags: ["Solidity", "Tokenomics", "DeFi", "Liquidity", "Mobile"],
  },
  {
    name: "blockchain-indexer",
    description:
      "Blokzincir verisi toplama, event indeksleme ve işlem otomasyonu için ölçeklenebilir mikroservis. Kafka tabanlı event streaming. Günlük milyonlarca eventi milisaniye altı gecikmeyle işler.",
    tags: ["Node.js", "Kafka", "Redis", "PostgreSQL", "Docker"],
  },
  {
    name: "mempool-monitor",
    description:
      "EVM zincirleri için gerçek zamanlı mempool işlem takibi. Bekleyen işlemleri izler, MEV fırsatlarını tespit eder, WebSocket üzerinden analiz pipeline'ına veri akışı sağlar.",
    tags: ["Go", "Web3.js", "EVM", "Redis", "WebSocket"],
  },
  {
    name: "cross-chain-bridge",
    description:
      "Birden çok heterojen zinciri birbirine bağlayan özel blokzincir köprü altyapısı. EVM ve non-EVM ağlar arasında varlık ve veri transferi. Validatör set consensus'u, on-chain light client doğrulama ve relayer node ağı.",
    tags: ["Solidity", "Go", "Bridge", "Cross-Chain", "Validators"],
  },
  {
    name: "steem-sidechain-network",
    description:
      "Native sidechain desteği olmayan blokzincirler (Steem) için sürdürülebilir sidechain çözümü. EVM uyumlu özel sidechain ile akıllı kontrat, dApp ve DeFi protokol desteği. Özel bridge, blok üretimi ve tokenomics.",
    tags: ["Go", "Sidechain", "EVM", "Infrastructure", "Custom"],
  },
];

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? "tr") as "tr" | "en";

  const dict =
    locale === "tr"
      ? (await import("@/lib/dictionaries/tr.json")).default
      : (await import("@/lib/dictionaries/en.json")).default;

  const experience = locale === "tr" ? experienceTR : experienceEN;
  const education = locale === "tr" ? educationTR : educationEN;
  const projects = locale === "tr" ? projectsTR : projectsEN;

  return (
    <div className="py-8">
      <div className="mb-12">
        <p className="font-mono text-sm text-foreground-dim mb-2">
          <span className="text-foreground-dim">$</span>{" "}
          {dict["portfolio.subtitle"]}
        </p>
        <h1 className="text-2xl font-mono font-semibold text-foreground">
          {dict["portfolio.title"]}
        </h1>
      </div>

      {/* Contact card — terminal style */}
      <div className="mb-12 rounded-lg border border-border overflow-hidden">
        <div className="px-4 py-2 bg-surface-alt/50 border-b border-border">
          <span className="text-xs font-mono text-foreground-dim">
            ~/.contact
          </span>
        </div>
        <div className="p-4 font-mono text-xs space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-foreground-dim w-16 shrink-0">email</span>
            <a
              href="mailto:mailtoberkant@gmail.com"
              className="text-foreground hover:opacity-70 transition-opacity"
            >
              mailtoberkant@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-foreground-dim w-16 shrink-0">github</span>
            <a
              href="https://github.com/berkantsoytas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:opacity-70 transition-opacity"
            >
              github.com/berkantsoytas
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-foreground-dim w-16 shrink-0">linkedin</span>
            <a
              href="https://linkedin.com/in/berkantsoytas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:opacity-70 transition-opacity"
            >
              linkedin.com/in/berkantsoytas
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-foreground-dim w-16 shrink-0">languages</span>
            <span className="text-foreground-dim">
              <span>{dict["portfolio.lang_tr"]}</span>
              <span className="mx-1.5 text-foreground-dim/50">·</span>
              <span>{dict["portfolio.lang_en"]}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-border mt-2">
            <span className="text-foreground-dim w-16 shrink-0">status</span>
            <span className="text-green-400 font-medium">
              ● available for hire
            </span>
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
                <div key={cat.key}>
                  <h4 className="font-mono text-[11px] text-foreground-dim uppercase tracking-wider mb-2">
                    {(dict as Record<string, string>)[`portfolio.${cat.key}`] ??
                      cat.title}
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
