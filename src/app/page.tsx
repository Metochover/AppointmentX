'use client';

import React from 'react';
import Link from 'next/link';
import { FaGem, FaCalendar, FaUserAlt, FaThumbtack, FaUsers, FaListAlt } from 'react-icons/fa';

const ServiceFeatures = () => {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-4xl text-center font-bold mb-8 text-gray-900">ÖZELLİKLER</h2>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <FaGem className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Hedef Müşteri</h3>
            <p className="text-gray-600">Müşterilerinizi elde tutmak için bildirim sistemi, ücretsiz şekilde hesabınıza tanımlanır.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <FaCalendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Randevu Ekranı</h3>
            <p className="text-gray-600">Randevularınızı en iyi şekilde yönetebilmeniz için şık bir tasarım sağlanır.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
              <FaUserAlt className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Profesyonel Hizmet</h3>
            <p className="text-gray-600">Uygulamanın menülerini hızlıca yönetmek için profesyonel hizmetler sağlanır.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
              <FaThumbtack className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Takvim Girişi</h3>
            <p className="text-gray-600">Randevuları daha kolay planlamak için takvim özelliği kullanılır.</p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
              <FaUsers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Kolay Kullanım</h3>
            <p className="text-gray-600">Kolay ve kullanıcı dostu arayüz ile her işlemi hızlıca yapabilirsiniz.</p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mb-4">
              <FaListAlt className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Özünde Basit</h3>
            <p className="text-gray-600">Müşterilerinizin hızlıca randevu almasını sağlayan basit bir sistem.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Modern Randevu Yönetimi
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-purple-100">
              İşletmeniz için profesyonel randevu yönetim sistemi
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/businesses" className="inline-block px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold text-lg hover:bg-purple-100 transition-colors duration-300">
                Randevu Al
              </Link>
              <Link href="/register" className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors duration-300 ring-2 ring-white">
                Hemen Başla
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <ServiceFeatures />

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            İşletmenizi Büyütmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Hemen ücretsiz hesap oluşturun ve randevularınızı yönetmeye başlayın
          </p>
          <Link href="/register" className="inline-block px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold text-lg hover:bg-purple-100 transition-colors duration-300">
            Ücretsiz Başla
          </Link>
        </div>
      </div>
    </div>
  );
}
