import Hero from "../components/landing/Hero";
import ProblemSection from "../components/landing/ProblemSection";
import SolutionSection from "../components/landing/SolutionSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import TechStackSection from "../components/landing/TechStackSection";
import ImpactSection from "../components/landing/ImpactSection";

export default function MainLayout() {
  return (
    <div className="space-y-2">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <TechStackSection />
      <ImpactSection />
    </div>
  );
}