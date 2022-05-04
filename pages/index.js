import Feature from "../components/story/feature/Feature";
// import HeroSection from "../components/story/HeroSection";
import Header from "../components/story/Header";
import Hero from "../components/story/hero/Hero";
import Question from "../components/story/question/Question";
import Footer from "../components/story/footer/Footer";
export default function Home() {
  return (
    <>
      {/* <HeroSection /> */}
      {console.log("re-runing")}

      <Hero />
      <Feature />
      <Question />
    </>
  );
}
// we should always try to keep page componnet lean
