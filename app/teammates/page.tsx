import MainApp, { Project, UserProfile } from "../components/MainApp";

export default async function TeammatesPage() {
  const userId = "dummy-user-id"; // Dummy user for testing

  const projects: Project[] = [
    {
      id: "1",
      title: "NOT HUMBLE",
      description: "A digital experience for a boutique creative agency focusing on minimalist aesthetics and bold typography.",
      videoUrl: "/videos/featured-video.mp4",
      category: "Digital Experience",
      year: "2024",
      owner: { name: "Aksay" },
      tags: "React, Framer Motion, GSAP"
    },
    {
      id: "2",
      title: "MAKE IT ZERO",
      description: "An interactive platform dedicated to environmental sustainability and carbon footprint tracking.",
      videoUrl: "/videos/make-it-zero.mp4",
      category: "Sustainability",
      year: "2023",
      owner: { name: "DeepMind" },
      tags: "Next.js, Three.js, Tailwind"
    },
    {
      id: "3",
      title: "EASY PEASY",
      description: "Simplifying complex financial data through intuitive visualization and seamless user flows.",
      videoUrl: "/videos/easy.mp4",
      category: "Fintech",
      year: "2024",
      owner: { name: "Opencode" },
      tags: "D3.js, React, Node.js"
    }
  ];
  const teammates: UserProfile[] = [
    {
      id: "u1",
      name: "Sarah Chen",
      bio: "Full-stack dev with a passion for creative coding and interactive UIs.",
      skills: "React, Three.js, WebGL",
      major: "Design Computing",
      university: "MIT",
      year: "Senior",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      email: "sarah@example.com"
    },
    {
      id: "u2",
      name: "Marcus Thorne",
      bio: "Product designer focused on building accessible and emotional digital experiences.",
      skills: "Figma, UI/UX, Design Systems",
      major: "Fine Arts",
      university: "RISD",
      year: "Junior",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      email: "marcus@example.com"
    }
  ];
  const userProfile = { id: userId, name: "Test User", bio: "Testing bio", skills: "Testing skills", major: "Computer Science", university: "Test University", year: "2024", image: null, email: "test@example.com" };
  const myProjects: Project[] = [];
  const matches: UserProfile[] = [];

  return (
    <MainApp
      projects={projects}
      teammates={teammates}
      userProfile={userProfile}
      myProjects={myProjects}
      matches={matches}
      initialTab="teammates"
    />
  );
}
