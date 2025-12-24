import { HeroSection } from "./components/HeroSection";
import { JobSearchPreview } from "./components/JobSearchPreview";
import { HowItWorksSection } from "./components/HowItWorksSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <JobSearchPreview />
      <HowItWorksSection />
    </>
  );
}
