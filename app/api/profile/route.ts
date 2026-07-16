import { NextResponse } from "next/server";

export async function GET() {
  const profile = {
    name: "Berkant Soytaş",
    role: "Software Developer & Architect",
    specialty: "Backend Infrastructure Developer",
    location: "Turkey",
    status: "available for hire",
    languages: [
      "Node.js",
      "TypeScript",
      "Go",
      "Rust",
      "C#",
      "Python",
      "Solidity",
    ],
    tools: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "MySQL",
      "Microsoft SQL Server",
      "MongoDB",
      "RabbitMQ",
      "Linux",
      "Nginx",
      "Git",
      "GitHub",
    ],
    links: {
      github: "https://github.com/berkantsoytas",
      linkedin: "https://linkedin.com/in/berkantsoytas",
      email: "mailtoberkant@gmail.com",
      website: "https://berkantsoytas.dev",
      source: "https://github.com/berkantsoytas/portfolio",
    },
  };

  return NextResponse.json(profile, {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}
