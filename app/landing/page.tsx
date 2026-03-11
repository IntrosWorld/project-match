"use client";

import dynamic from "next/dynamic";

const AppBar = dynamic(() => import("../components/shared/AppBar"), { ssr: false });
const Banner = dynamic(() => import("../components/shared/Home/Banner"), { ssr: false });
const Content = dynamic(() => import("../components/shared/Home/Content"), { ssr: false });
const Featured = dynamic(() => import("../components/shared/Home/FeaturedProject"), { ssr: false });
const About = dynamic(() => import("../components/shared/Home/About"), { ssr: false });
const Contact = dynamic(() => import("../components/shared/Home/Contact"), { ssr: false });
const Footer = dynamic(() => import("../components/shared/Home/Footer"), { ssr: false });
const Menu = dynamic(() => import("../components/shared/Menu"), { ssr: false });

export default function LandingPage() {
  return (
    <div>
      <Menu />
      <AppBar />
      <Banner />
      <Content />
      <Featured />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
