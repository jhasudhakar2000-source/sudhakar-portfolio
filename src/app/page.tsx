import { AboutSection } from "@/sections/about-section";
import { ArchiveSection } from "@/sections/archive-section";
import { ContactSection } from "@/sections/contact-section";
import { CutOfWorkSection } from "@/sections/cut-of-work-section";
import { HeroSection } from "@/sections/hero-section";
import { ImpactSection } from "@/sections/impact-section";
import { SelectedWorkSection } from "@/sections/selected-work-section";
import { SelectClientsSection } from "@/sections/select-clients-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <CutOfWorkSection />
      <SelectClientsSection />
      <ImpactSection />
      <AboutSection />
      <ArchiveSection />
      <ContactSection />
    </>
  );
}
