import React from 'react';
import { FaCalendarAlt, FaChartBar, FaUsers, FaClock, FaMobile, FaBell } from 'react-icons/fa';

const Features = () => {
    const features = [
        {
            icon: <FaCalendarAlt className="text-5xl mb-4 text-blue-500" />,
            title: "Randevu Yönetimi",
            description: "Tüm randevularınızı tek bir yerden kolayca yönetin ve takip edin."
        },
        {
            icon: <FaChartBar className="text-5xl mb-4 text-green-500" />,
            title: "Detaylı Raporlama",
            description: "İşletmenizin performansını anlık olarak takip edin ve analiz edin."
        },
        {
            icon: <FaUsers className="text-5xl mb-4 text-purple-500" />,
            title: "Personel Yönetimi",
            description: "Personelinizin çalışma saatlerini ve randevularını kolayca planlayın."
        },
        {
            icon: <FaClock className="text-5xl mb-4 text-orange-500" />,
            title: "Online Randevu",
            description: "Müşterileriniz 7/24 online randevu alabilsin."
        },
        {
            icon: <FaMobile className="text-5xl mb-4 text-red-500" />,
            title: "Mobil Uyumlu",
            description: "Tüm cihazlardan erişilebilir modern arayüz."
        },
        {
            icon: <FaBell className="text-5xl mb-4 text-yellow-500" />,
            title: "Bildirim Sistemi",
            description: "SMS ve e-posta ile otomatik randevu hatırlatmaları."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Özellikler</h2>
                    <p className="text-xl text-gray-600">İşletmenizi büyütmek için ihtiyacınız olan her şey</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
                            <div className="flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features; 