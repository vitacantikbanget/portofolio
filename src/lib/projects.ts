import { supabase } from "./supabase";

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: "web" | "uiux";
  description: string;
  long_description: string;
  technologies: string[];
  image: string;
  link: string;
};

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Project;
}