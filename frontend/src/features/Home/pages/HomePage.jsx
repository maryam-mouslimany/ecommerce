import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import LandingSection from "../components/LandingSection";
import LatestSection from "../components/LatestSection";
import OfferSection from "../components/OfferSection";
const HomePage = () => {
  return (
    <>
      <Header />
      <LandingSection />
      <LatestSection />
      <OfferSection />
      <Footer />
    </>
  );
};

export default HomePage;
