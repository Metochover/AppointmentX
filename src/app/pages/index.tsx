import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceCategories from '../components/ServiceCategories';
import MembershipCards from '../components/MembershipCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ServicesIntro from '../components/ServicesIntro';

const Home = () => {
    return (
        <div>
            <Header />
            <HeroSection />
            <ServiceCategories />
            <ServicesIntro />

            <MembershipCards />
            <Footer />
        </div>
    );
};

export default Home;
