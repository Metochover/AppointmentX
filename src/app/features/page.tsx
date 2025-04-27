'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    FaCalendarCheck,
    FaUsers,
    FaBell,
    FaChartLine,
    FaSync,
    FaBuilding
} from 'react-icons/fa';

const features = [
    {
        icon: <FaCalendarCheck className="w-8 h-8" />,
        title: "Kolay Randevu Yönetimi",
        description: "Randevularınızı tek bir yerden kolayca yönetin, düzenleyin ve takip edin.",
        color: "bg-purple-500"
    },
    {
        icon: <FaUsers className="w-8 h-8" />,
        title: "Müşteri Yönetimi",
        description: "Müşteri bilgilerini saklayın, randevu geçmişini görüntüleyin ve müşteri ilişkilerinizi güçlendirin.",
        color: "bg-blue-500"
    },
    {
        icon: <FaBell className="w-8 h-8" />,
        title: "Otomatik Hatırlatmalar",
        description: "Müşterilerinize otomatik SMS ve e-posta bildirimleri göndererek randevu kaçırmalarını önleyin.",
        color: "bg-green-500"
    },
    {
        icon: <FaChartLine className="w-8 h-8" />,
        title: "Detaylı Raporlama",
        description: "İşletmenizin performansını analiz edin, randevu istatistiklerini görüntüleyin.",
        color: "bg-yellow-500"
    },
    {
        icon: <FaSync className="w-8 h-8" />,
        title: "Takvim Entegrasyonu",
        description: "Google Takvim entegrasyonu ile randevularınızı her yerden senkronize edin.",
        color: "bg-red-500"
    },
    {
        icon: <FaBuilding className="w-8 h-8" />,
        title: "Çoklu Şube Desteği",
        description: "Birden fazla şubenizi tek bir sistemden yönetin ve kontrol edin.",
        color: "bg-indigo-500"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">
                        Özellikler
                    </h2>
                    <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
                        İşletmeniz için Tüm İhtiyaçlar Tek Platformda
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                        AppointX ile işletmenizin randevu yönetimini modernleştirin ve verimliliğinizi artırın.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="relative group"
                        >
                            <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="p-8">
                                    <div className={`inline-flex items-center justify-center p-3 ${feature.color} rounded-xl text-white mb-6 group-hover:scale-110 transform transition-all duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Hemen Başlayın
                        </h2>
                        <a
                            href="/register"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                        >
                            Ücretsiz Deneyin
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 