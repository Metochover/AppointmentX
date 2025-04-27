import React from 'react';
import { FaCut, FaStethoscope, FaDumbbell, FaSpa, FaHeartbeat, FaAppleAlt } from 'react-icons/fa';

const ServiceCategories = () => {
    const categories = [
        { name: 'Kuaför', icon: <FaCut className="text-5xl text-purple-500" />, description: 'Kuaför hizmetleri ve saç bakımı.' },
        { name: 'Diyetisyen', icon: <FaAppleAlt className="text-5xl text-purple-500" />, description: 'Sağlıklı beslenme ve diyet programları.' },
        { name: 'Psikolog', icon: <FaStethoscope className="text-5xl text-purple-500" />, description: 'Psikolojik danışmanlık ve terapi.' },
        { name: 'Pilates', icon: <FaDumbbell className="text-5xl text-purple-500" />, description: 'Pilates dersleri ve fitness.' },
        { name: 'Fizyoterapist', icon: <FaHeartbeat className="text-5xl text-purple-500" />, description: 'Fizyoterapi tedavi ve rehabilitasyon.' },
        { name: 'Güzellik Salonu', icon: <FaSpa className="text-5xl text-purple-500" />, description: 'Cilt bakımı, masaj ve güzellik hizmetleri.' },
    ];

    return (
        <section className="py-20 bg-gray-100">
            <h2 className="text-5xl text-center mb-8 font-bold text-purple-800">Hizmet Kategorileri</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                {categories.map((category) => (
                    <div key={category.name} className="bg-white p-8 shadow-lg rounded-lg max-w-md mb-6 flex flex-col items-center hover:bg-blue-50 transition-all">
                        <div className="bg-gray-100 p-8 rounded-full mb-4">
                            {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold mt-4 text-gray-800">{category.name}</h3>
                        <p className="text-center text-gray-600 mt-2">{category.description}</p>
                        <div className="mt-4">
                            <a href="#" className="bg-blue-500 text-white py-2 px-6 rounded-lg">Detaylar</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceCategories;
