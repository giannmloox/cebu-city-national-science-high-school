import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AdmissionsSection from "@/components/AdmissionsSection";
import ProgramsSection from "@/components/ProgramsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import StudentLifeSection from "@/components/StudentLifeSection";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import ContactFooter from "@/components/ContactFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AdmissionsSection />
      <ProgramsSection />
      <WhyChooseSection />
      <StudentLifeSection />
      <GallerySection />
      <NewsSection />
      <ContactFooter />
    </div>
  );
};

export default Index;
