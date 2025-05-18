import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import CallToAction from '@/components/landing/call-to-action';

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />
      <FeaturesSection />
      <CallToAction />
    </div>
  );
}