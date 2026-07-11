import { NextResponse } from "next/server";

export async function GET() {
  const profile = {
    name: "Berkant Soytaş",
    role: "Software Architect",
    specialty: "Systems Programming",
    location: "Adana, TR",
    status: "available for hire",
    languages: ["Go", "Node.js", "Rust", "Solidity", "TypeScript"],
    tools: [
      "Docker",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "Kubernetes",
      "Terraform",
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
