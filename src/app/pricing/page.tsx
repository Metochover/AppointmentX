'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaRegLightbulb, FaRegClock, FaRegSmile } from 'react-icons/fa';

const features = [
    {
        icon: <FaRegLightbulb className="h-6 w-6" />,
        title: "Kolay Kullanım",
        description: "Sezgisel arayüz ile hızlıca randevu yönetimi"
    },
    {
        icon: <FaRegClock className="h-6 w-6" />,
        title: "7/24 Destek",
        description: "Her zaman yanınızda olan destek ekibi"
    },
    {
        icon: <FaRegSmile className="h-6 w-6" />,
        title: "Müşteri Memnuniyeti",
        description: "Müşterileriniz için en iyi deneyim"
    }
];

const pricingPlans = [
    {
        name: 'Başlangıç',
        description: 'Küçük işletmeler için ideal başlangıç paketi',
        price: '199',
        features: [
            'Aylık 100 randevu',
            'E-posta bildirimleri',
            'Temel raporlama',
            'Tek şube desteği',
            '7/24 e-posta desteği'
        ]
    },
    {
        name: 'Profesyonel',
        description: 'Büyüyen işletmeler için gelişmiş özellikler',
        price: '399',
        features: [
            'Sınırsız randevu',
            'SMS bildirimleri',
            'Gelişmiş raporlama',
            '3 şubeye kadar destek',
            'Öncelikli destek',
            'Google Takvim entegrasyonu'
        ],
        isPopular: true
    },
    {
        name: 'Kurumsal',
        description: 'Büyük işletmeler için tam kapsamlı çözüm',
        price: '799',
        features: [
            'Sınırsız randevu',
            'Toplu SMS gönderimi',
            'Özelleştirilebilir raporlar',
            'Sınırsız şube desteği',
            'Kişisel destek yöneticisi',
            'API erişimi',
            'Özel entegrasyonlar'
        ]
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-base font-semibold text-purple-600 tracking-wide uppercase mb-4">
                        Fiyatlandırma
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        İşletmenize Uygun Fiyatlandırma
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Her ölçekteki işletme için uygun fiyatlandırma seçenekleri.
                        İhtiyacınıza en uygun paketi seçin ve hemen başlayın.
                    </p>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Pricing Cards */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-20">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`w-full lg:w-1/3 ${index === 1 ? 'lg:-mt-8' : ''}`}
                        >
                            <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${index === 1 ? 'ring-2 ring-purple-500 scale-105' : 'scale-95'
                                }`}>
                                {index === 1 && (
                                    <div className="bg-purple-500 text-white text-center text-sm py-1">
                                        En Popüler
                                    </div>
                                )}
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        {plan.description}
                                    </p>
                                    <div className="flex items-baseline mb-8">
                                        <span className="text-4xl font-bold text-gray-900">₺{plan.price}</span>
                                        <span className="text-gray-500 ml-2">/ay</span>
                                    </div>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <div className="flex-shrink-0 h-5 w-5 text-purple-500">
                                                    <FaCheck className="h-full w-full" />
                                                </div>
                                                <span className="ml-3 text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 ${index === 1
                                            ? 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
                                            : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
                                            }`}
                                    >
                                        Hemen Başla
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Özel İhtiyaçlarınız mı Var?
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Kurumsal çözümler için özel fiyatlandırma ve özellikler sunuyoruz.
                        Size özel çözümler için bizimle iletişime geçin.
                    </p>
                    <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:shadow-lg">
                        Bizimle İletişime Geçin
                    </button>
                </div>
            </div>
        </div>
    );
}
