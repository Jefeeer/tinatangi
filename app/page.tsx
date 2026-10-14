import { Bisita } from "@/components/Bisita";
import { BottomBar } from "@/components/BottomBar";
import DayEngine from "@/components/DayEngine";
import { Footer } from "@/components/Footer";
import { Gabi } from "@/components/Gabi";
import { Hardin } from "@/components/Hardin";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Kape } from "@/components/Kape";
import { Menu } from "@/components/Menu";
import RevealEngine from "@/components/RevealEngine";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <span id="top" />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Kape />
        <Menu />
        <Hardin />
        <Gabi />
        <Bisita />
      </main>
      <Footer />
      <BottomBar />
      <SmoothScroll />
      <RevealEngine />
      <DayEngine />
      <JsonLd />
    </>
  );
}
