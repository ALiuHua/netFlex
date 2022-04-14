import Feature from "../components/story/feature/Feature";
// import HeroSection from "../components/story/HeroSection";
import Header from "../components/story/Header";
import Hero from "../components/story/hero/Hero";
export default function Home() {
  return (
    <>
      {/* <HeroSection /> */}
      <Header />
      <Hero />
      <Feature />
    </>
  );
}
// we should always try to keep page componnet lean
