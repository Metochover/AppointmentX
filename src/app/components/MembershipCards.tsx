import React from 'react';

const MembershipCards = () => {
    const plans = [
        { title: 'Temel Paket', price: '360₺', description: 'Bir salon için tek kullanıcı desteği.' },
        { title: 'Gelişmiş Paket', price: '480₺', description: '2 salon ve 2 personel için geçerli.' },
        { title: 'Profesyonel Paket', price: '600₺', description: '5 salon ve 5 personel için uygun.' },
    ];

    return (
        <section className="py-20 bg-gray-100">
            <h2 className="text-4xl font-semibold text-center text-purple-800 mb-12">Şube Sahipleri için Üyelik Paketleri</h2>
            <div className="flex justify-center gap-8 flex-wrap">
                {plans.map((plan) => (
                    <div key={plan.title} className="bg-white p-8 shadow-lg rounded-lg w-80 hover:scale-105 transition-transform duration-300">
                        <h3 className="text-2xl font-semibold text-center text-purple-900 mb-4">{plan.title}</h3>
                        <p className="text-center text-3xl font-bold text-purple-700 mb-4">{plan.price}</p>
                        <p className="text-center text-gray-700 mb-6">{plan.description}</p>
                        <div className="text-center">
                            <a href="/membership" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">Satın Al</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MembershipCards;
