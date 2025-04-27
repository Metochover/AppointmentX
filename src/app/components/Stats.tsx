import React from 'react';
import { FaBuilding, FaCalendarCheck, FaUsers, FaStar } from 'react-icons/fa';

const Stats = () => {
    const stats = [
        {
            icon: <FaBuilding className="text-4xl text-blue-500 mb-2" />,
            number: "1000+",
            label: "İşletme",
            description: "Aktif İşletme"
        },
        {
            icon: <FaCalendarCheck className="text-4xl text-green-500 mb-2" />,
            number: "50,000+",
            label: "Randevu",
            description: "Aylık Randevu"
        },
        {
            icon: <FaUsers className="text-4xl text-purple-500 mb-2" />,
            number: "100,000+",
            label: "Kullanıcı",
            description: "Aktif Kullanıcı"
        },
        {
            icon: <FaStar className="text-4xl text-yellow-500 mb-2" />,
            number: "4.8",
            label: "Puan",
            description: "Müşteri Memnuniyeti"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Rakamlarla Biz</h2>
                    <p className="text-xl text-gray-600">Türkiye'nin en hızlı büyüyen randevu platformu</p>
                    <div className="text-sm text-gray-500">İşletmenizin başarısını artırmak için müşterilerinizi tanıyın</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                            <div className="flex justify-center">
                                {stat.icon}
                            </div>
                            <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                            <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                            <div className="text-gray-600">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats; 