import React from 'react';
import { FaGem, FaCalendar, FaUserAlt, FaThumbtack, FaUsers, FaListAlt } from 'react-icons/fa';

const ServiceFeatures = () => {
    return (
        <section className="py-20 bg-gray-800 text-white">
            <h2 className="text-4xl text-center font-bold mb-8 text-white">ÖZELLİKLER</h2>
            <div className="max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Feature 1 */}
                    <div className="bg-blue-600 p-8 rounded-lg text-center shadow-lg">
                        <FaGem className="text-6xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Hedef Müşteri</h3>
                        <p>Müşterilerinizi elde tutmak için bildirim sistemi, ücretsiz şekilde hesabınıza tanımlanır.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-green-600 p-8 rounded-lg text-center shadow-lg">
                        <FaCalendar className="text-6xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Randevu Ekranı</h3>
                        <p>Randevularınızı en iyi şekilde yönetebilmeniz için şık bir tasarım sağlanır.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-orange-600 p-8 rounded-lg text-center shadow-lg">
                        <FaUserAlt className="text-6xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Profesyonel Hizmet</h3>
                        <p>Uygulamanın menülerini hızlıca yönetmek için profesyonel hizmetler sağlanır.</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-purple-600 p-8 rounded-lg text-center shadow-lg">
                        <FaThumbtack className="text-6xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Takvim Girişi</h3>
                        <p>Randevuları daha kolay planlamak için takvim özelliği kullanılır.</p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-red-600 p-8 rounded-lg text-center shadow-lg">
                        <FaUsers className="text-6xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Kolay Kullanım</h3>
                        <p>Kolay ve kullanıcı dostu arayüz ile her işlemi hızlıca yapabilirsiniz.</p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-teal-600 p-8 rounded-lg text-center shadow-lg">
                        <FaListAlt className="text-6xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Özünde Basit</h3>
                        <p>Müşterilerinizin hızlıca randevu almasını sağlayan basit bir sistem.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceFeatures;
