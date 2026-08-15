import { AboutSection } from "@/sections/about-section";
import { ArchiveSection } from "@/sections/archive-section";
import { BehindTheEditSection } from "@/sections/behind-the-edit-section";
import { ContactSection } from "@/sections/contact-section";
import { HeroSection } from "@/sections/hero-section";
import { ImpactSection } from "@/sections/impact-section";
import { PlaceholderSection } from "@/sections/placeholder-section";
import { SelectedWorkSection } from "@/sections/selected-work-section";
import { SelectClientsSection } from "@/sections/select-clients-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <BehindTheEditSection />
      <SelectClientsSection />
      <ImpactSection />
      <AboutSection />
      <ArchiveSection />
      <ContactSection />
      <PlaceholderSection id="showreel" title="Showreel" />
      <PlaceholderSection id="arsenal" title="Creative Arsenal" />
      <PlaceholderSection id="services" title="Services" />
    </>
  );
}
