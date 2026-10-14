import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import GlobalBackground from "@/components/ui/GlobalBackground";
import SplashScreen from "@/components/ui/SplashScreen";
import { supabase } from "@/lib/supabase";
import { getSkills } from "@/lib/skills";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const [profileRes, skills, projects] = await Promise.all([
    supabase
      .from("profile")
      .select("username, tagline, bio, avatar_url")
      .limit(1)
      .maybeSingle(),
    getSkills(),
    getProjects(),
  ]);

  const profile = profileRes.data ?? null;
  const avatarUrl = profile?.avatar_url ?? null;

  return (
    <>
      <SplashScreen />
      <GlobalBackground />
      <Navbar />
      <main>
        <Hero avatarUrl={avatarUrl} />
        <About initialProfile={profile} />
        <Skills initialSkills={skills} />
        <Projects initialProjects={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}