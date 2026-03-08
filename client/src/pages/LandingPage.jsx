import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import PromoBanner from '@/components/landing/PromoBanner';
import CategoryCards from '@/components/landing/CategoryCards';
import TopHiringInstitutions from '@/components/landing/TopHiringInstitutions';
import FeaturedInstitutions from '@/components/landing/FeaturedInstitutions';
import VideoSection from '@/components/landing/VideoSection';
import CareerSection from '@/components/landing/CareerSection';
import EventsSection from '@/components/landing/EventsSection';
import PlatformStats from '@/components/landing/PlatformStats';
import CallToAction from '@/components/landing/CallToAction';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <PromoBanner />
      <CategoryCards />
      <TopHiringInstitutions />
      <FeaturedInstitutions />
      <VideoSection />
      <CareerSection />
      <EventsSection />
      <PlatformStats />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;