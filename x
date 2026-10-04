warning: in the working copy of 'src/components/Skills.tsx', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/public/og-image1.jpg b/public/og-image1.jpg[m
[1mdeleted file mode 100644[m
[1mindex ce90c75..0000000[m
Binary files a/public/og-image1.jpg and /dev/null differ
[1mdiff --git a/src/app/page.tsx b/src/app/page.tsx[m
[1mindex a4c85ee..571bc3e 100644[m
[1m--- a/src/app/page.tsx[m
[1m+++ b/src/app/page.tsx[m
[36m@@ -7,18 +7,34 @@[m [mimport Contact from "@/components/Contact";[m
 import Footer from "@/components/Footer";[m
 import GlobalBackground from "@/components/GlobalBackground";[m
 import SplashScreen from "@/components/SplashScreen";[m
[32m+[m[32mimport { supabase } from "@/lib/supabase";[m
[32m+[m[32mimport { getSkills } from "@/lib/skills";[m
[32m+[m[32mimport { getProjects } from "@/lib/projects";[m
[32m+[m
[32m+[m[32mexport default async function Home() {[m
[32m+[m[32m  const [profileRes, skills, projects] = await Promise.all([[m
[32m+[m[32m    supabase[m
[32m+[m[32m      .from("profile")[m
[32m+[m[32m      .select("username, tagline, bio, avatar_url")[m
[32m+[m[32m      .limit(1)[m
[32m+[m[32m      .maybeSingle(),[m
[32m+[m[32m    getSkills(),[m
[32m+[m[32m    getProjects(),[m
[32m+[m[32m  ]);[m
[32m+[m
[32m+[m[32m  const profile = profileRes.data ?? null;[m
[32m+[m[32m  const avatarUrl = profile?.avatar_url ?? null;[m
 [m
[31m-export default function Home() {[m
   return ([m
     <>[m
       <SplashScreen />[m
       <GlobalBackground />[m
       <Navbar />[m
       <main>[m
[31m-        <Hero />[m
[31m-        <About />[m
[31m-        <Skills />[m
[31m-        <Projects />[m
[32m+[m[32m        <Hero avatarUrl={avatarUrl} />[m
[32m+[m[32m        <About initialProfile={profile} />[m
[32m+[m[32m        <Skills initialSkills={skills} />[m
[32m+[m[32m        <Projects initialProjects={projects} />[m
         <Contact />[m
       </main>[m
       <Footer />[m
[1mdiff --git a/src/components/About.tsx b/src/components/About.tsx[m
[1mindex 14571a3..598f508 100644[m
[1m--- a/src/components/About.tsx[m
[1m+++ b/src/components/About.tsx[m
[36m@@ -4,9 +4,7 @@[m [mimport { useEffect, useState } from "react";[m
 import Image from "next/image";[m
 import { motion } from "framer-motion";[m
 import { Code2, Palette, Bug } from "lucide-react";[m
[31m-import { supabase } from "@/lib/supabase";[m
[31m-[m
[31m-type ProfileAbout = {[m
[32m+[m[32mexport type ProfileAbout = {[m
   username: string | null;[m
   tagline: string | null;[m
   bio: string | null;[m
[36m@@ -54,16 +52,12 @@[m [mconst itemVariants = {[m
   },[m
 };[m
 [m
[31m-export default function About() {[m
[31m-  const [profile, setProfile] = useState<ProfileAbout | null>(null);[m
[32m+[m[32minterface AboutProps {[m
[32m+[m[32m  initialProfile?: ProfileAbout | null;[m
[32m+[m[32m}[m
 [m
[31m-  useEffect(() => {[m
[31m-    void supabase[m
[31m-      .from("profile")[m
[31m-      .select("username, tagline, bio, avatar_url")[m
[31m-      .maybeSingle()[m
[31m-      .then(({ data }) => setProfile(data));[m
[31m-  }, []);[m
[32m+[m[32mexport default function About({ initialProfile }: AboutProps) {[m
[32m+[m[32m  const [profile] = useState<ProfileAbout | null>(initialProfile ?? null);[m
 [m
   return ([m
     <section id="about" className="section-pad relative overflow-hidden">[m
[1mdiff --git a/src/components/Contact.tsx b/src/components/Contact.tsx[m
[1mindex 74676d4..3f0d31d 100644[m
[1m--- a/src/components/Contact.tsx[m
[1m+++ b/src/components/Contact.tsx[m
[36m@@ -4,7 +4,6 @@[m [mimport { useState } from "react";[m
 import { motion } from "framer-motion";[m
 import { ArrowUpRight, Send } from "lucide-react";[m
 import { FaInstagram, FaGithub } from "react-icons/fa";[m
[31m-import { sendMessage } from "@/lib/contact"; // fungsi kirim pesan ke Supabase[m
 [m
 // Data sosial media[m
 const socials = [[m
[36m@@ -34,6 +33,7 @@[m [mexport default function Contact() {[m
     setStatus("idle");[m
 [m
     // Kirim data ke Supabase[m
[32m+[m[32m    const { sendMessage } = await import("@/lib/contact");[m
     const result = await sendMessage(form);[m
 [m
     setSending(false);[m
[1mdiff --git a/src/components/Hero.tsx b/src/components/Hero.tsx[m
[1mindex ea201db..9e31772 100644[m
[1m--- a/src/components/Hero.tsx[m
[1m+++ b/src/components/Hero.tsx[m
[36m@@ -5,22 +5,16 @@[m [mimport Image from "next/image";[m
 import { motion } from "framer-motion";[m
 import { ArrowRight, Mail } from "lucide-react";[m
 import TypingText from "./hero/TypingText";[m
[31m-import { supabase } from "@/lib/supabase";[m
 [m
[31m-export default function Hero() {[m
[32m+[m[32minterface HeroProps {[m
[32m+[m[32m  avatarUrl?: string | null;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport default function Hero({ avatarUrl }: HeroProps) {[m
   // State buat posisi mouse (buat parallax foto)[m
   const [mouse, setMouse] = useState({ x: 0, y: 0 });[m
   // State buat cek apakah layar desktop[m
   const [isDesktop, setIsDesktop] = useState(false);[m
[31m-  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);[m
[31m-[m
[31m-  useEffect(() => {[m
[31m-    void supabase[m
[31m-      .from("profile")[m
[31m-      .select("avatar_url")[m
[31m-      .maybeSingle()[m
[31m-      .then(({ data }) => setAvatarUrl(data?.avatar_url ?? null));[m
[31m-  }, []);[m
 [m
   // Cek ukuran layar — jalan saat pertama kali + saat resize[m
   useEffect(() => {[m
[1mdiff --git a/src/components/Projects.tsx b/src/components/Projects.tsx[m
[1mindex 96eb014..d302192 100644[m
[1m--- a/src/components/Projects.tsx[m
[1m+++ b/src/components/Projects.tsx[m
[36m@@ -1,24 +1,18 @@[m
 "use client";[m
 [m
[31m-import { useEffect, useState } from "react";[m
[32m+[m[32mimport { useState } from "react";[m
 import { motion } from "framer-motion";[m
 import Link from "next/link";[m
 import { ArrowRight } from "lucide-react";[m
 import ProjectCard from "./ProjectCard";[m
[31m-import { getProjects, type Project } from "@/lib/projects";[m
[32m+[m[32mimport type { Project } from "@/lib/projects";[m
 [m
[31m-export default function Projects() {[m
[31m-  // State buat nyimpen data project dari Supabase[m
[31m-  const [projects, setProjects] = useState<Project[]>([]);[m
[32m+[m[32minterface ProjectsProps {[m
[32m+[m[32m  initialProjects?: Project[];[m
[32m+[m[32m}[m
 [m
[31m-  // Ambil data project pas halaman pertama kali dibuka[m
[31m-  useEffect(() => {[m
[31m-    const fetchData = async () => {[m
[31m-      const data = await getProjects(); // fetch dari Supabase[m
[31m-      setProjects(data.slice(0, 3));    // ambil 3 project pertama aja[m
[31m-    };[m
[31m-    fetchData();[m
[31m-  }, []); // kurung siku kosong = jalan sekali doang[m
[32m+[m[32mexport default function Projects({ initialProjects }: ProjectsProps) {[m
[32m+[m[32m  const [projects] = useState<Project[]>(initialProjects?.slice(0, 3) ?? []);[m
 [m
   return ([m
     <section id="projects" className="section-pad relative overflow-hidden">[m
[1mdiff --git a/src/components/Skills.tsx b/src/components/Skills.tsx[m
[1mindex 52216c7..3deb5c2 100644[m
[1m--- a/src/components/Skills.tsx[m
[1m+++ b/src/components/Skills.tsx[m
[36m@@ -1,9 +1,9 @@[m
 "use client";[m
 [m
[31m-import { useEffect, useState } from "react";[m
[32m+[m[32mimport { useState } from "react";[m
 import { motion, type Variants } from "framer-motion";[m
 import { Code2, Palette, Wrench } from "lucide-react";[m
[31m-import { getSkills, type Skill } from "@/lib/skills";[m
[32m+[m[32mimport type { Skill } from "@/lib/skills";[m
 [m
 // Kategori + judul + deskripsi singkat (fixed, tampil sebagai kartu)[m
 const categoryInfo = [[m
[36m@@ -46,16 +46,12 @@[m [mconst itemVariants: Variants = {[m
   },[m
 };[m
 [m
[31m-export default function Skills() {[m
[31m-  const [skills, setSkills] = useState<Skill[]>([]);[m
[32m+[m[32minterface SkillsProps {[m
[32m+[m[32m  initialSkills?: Skill[];[m
[32m+[m[32m}[m
 [m
[31m-  useEffect(() => {[m
[31m-    const fetchData = async () => {[m
[31m-      const data = await getSkills();[m
[31m-      setSkills(data);[m
[31m-    };[m
[31m-    fetchData();[m
[31m-  }, []);[m
[32m+[m[32mexport default function Skills({ initialSkills }: SkillsProps) {[m
[32m+[m[32m  const [skills] = useState<Skill[]>(initialSkills ?? []);[m
 [m
   return ([m
     <section id="skills" className="section-pad relative overflow-hidden">[m
