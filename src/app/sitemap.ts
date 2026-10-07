import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";

const BASE_URL = "https://desvita-putri.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ambil semua project dari Supabase untuk dynamic routes
  const projects = await getProjects();

  // Halaman detail tiap project → /projects/[slug]
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    // Homepage
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Halaman daftar project
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Semua halaman detail project
    ...projectEntries,
  ];
}