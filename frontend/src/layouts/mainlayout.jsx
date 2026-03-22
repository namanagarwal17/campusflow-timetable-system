import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProblemSection from "../components/landing/ProblemSection";
import SolutionSection from "../components/landing/SolutionSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import TechStackSection from "../components/landing/TechStackSection";
import ImpactSection from "../components/landing/ImpactSection";
import Footer from "../components/landing/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="space-y-2">
        <Navbar />
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <TechStackSection />
        <ImpactSection />
        <Footer />
      </div>
    </div>
  );
}