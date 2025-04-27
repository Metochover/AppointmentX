import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-purple-700 to-blue-600 text-white py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                        İşletmeniz İçin Modern Randevu Sistemi
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Müşterilerinize kolay ve hızlı randevu alma imkanı sunun, işletmenizi dijitalleştirin.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/register" className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                            Hemen Başla
                        </Link>
                        <Link href="/features" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition duration-300">
                            Özellikler
                        </Link>
                    </div>
                    <div className="mt-12">
                        <Image
                            src="/hero-image.jpg"
                            alt="Modern randevu sistemi"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero; 