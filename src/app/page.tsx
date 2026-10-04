import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import SplashScreen from "@/components/SplashScreen";
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