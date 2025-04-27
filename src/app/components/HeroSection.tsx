import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-r from-purple-700 to-blue-600 text-white py-24 px-8 flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-4">Tüm Hizmetler için Mobil Uygulama</h1>
            <p className="text-lg mb-8">Uygulamanızı hemen indirerek tüm kategorilerdeki en iyi hizmetlere kolayca ulaşın.</p>

            <div className="flex gap-8 mb-12">
                <a href="#" className="bg-black py-3 px-8 rounded-lg text-white flex items-center justify-center gap-2">
                    <FaApple className="text-2xl" /> Apple Store
                </a>
                <a href="#" className="bg-green-500 py-3 px-8 rounded-lg text-white flex items-center justify-center gap-2">
                    <FaGooglePlay className="text-2xl" /> Play Store
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
