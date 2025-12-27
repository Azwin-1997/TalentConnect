import { FeaturedJobsSection } from "@/app/components/FeaturedJobsSection";
import { HeroSection } from "@/app/components/HeroSection";
import { HowItWorksSection } from "@/app/components/HowItWorksSection";
import { JobSearchPreview } from "@/app/components/JobSearchPreview";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <JobSearchPreview />
      <HowItWorksSection />
      <FeaturedJobsSection />
     
    </>
  );
}