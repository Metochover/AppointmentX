'use client';

import React, { useState } from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';
import BookingModal from '@/app/components/booking/BookingModal';

const categories = [
    'Tümü',
    'Kuaför & Güzellik',
    'Diş & Sağlık',
    'Spor & Fitness',
    'Veteriner',
    'Psikolog',
    'Fizyoterapist'
];

interface Service {
    id: string;
    name: string;
    duration: string;
    price: number;
}

interface Staff {
    id: string;
    name: string;
    title: string;
    services: string[]; // service IDs
}

interface Business {
    id: string;
    name: string;
    type: string;
    rating: number;
    reviews: number;
    image: string;
    description: string;
    services: Service[];
    staff: Staff[];
}

const businesses: Business[] = [
    {
        id: '1',
        name: 'Elit Kuaför',
        type: 'Kuaför & Güzellik',
        rating: 4.8,
        reviews: 128,
        image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Modern ve şık ortamında profesyonel hizmet sunan kuaför salonu.',
        services: [
            { id: '1', name: 'Saç Kesimi', duration: '30 dk', price: 150 },
            { id: '2', name: 'Saç Boyama', duration: '120 dk', price: 400 },
            { id: '3', name: 'Fön', duration: '30 dk', price: 100 },
        ],
        staff: [
            { id: '1', name: 'Ahmet Yılmaz', title: 'Uzman Kuaför', services: ['1', '2', '3'] },
            { id: '2', name: 'Mehmet Demir', title: 'Stilist', services: ['1', '3'] },
        ]
    },
    {
        id: '2',
        name: 'Style Studio',
        type: 'Kuaför & Güzellik',
        rating: 4.7,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Uzman kadrosuyla saç ve güzellik hizmetleri sunan modern salon.',
        services: [
            { id: '1', name: 'Saç Kesimi', duration: '45 dk', price: 200 },
            { id: '2', name: 'Manikür', duration: '60 dk', price: 150 },
            { id: '3', name: 'Pedikür', duration: '60 dk', price: 150 },
        ],
        staff: [
            { id: '1', name: 'Ayşe Kaya', title: 'Güzellik Uzmanı', services: ['2', '3'] },
            { id: '2', name: 'Fatma Şahin', title: 'Saç Stilisti', services: ['1'] },
        ]
    },
    {
        id: '3',
        name: 'Beauty Center',
        type: 'Kuaför & Güzellik',
        rating: 4.9,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        description: 'Profesyonel güzellik merkezi ve cilt bakım hizmetleri.',
        services: [
            { id: '1', name: 'Cilt Bakımı', duration: '60 dk', price: 300 },
            { id: '2', name: 'Makyaj', duration: '45 dk', price: 250 },
            { id: '3', name: 'Epilasyon', duration: '30 dk', price: 200 },
        ],
        staff: [
            { id: '1', name: 'Zeynep Yıldız', title: 'Güzellik Uzmanı', services: ['1', '2'] },
            { id: '2', name: 'Elif Demir', title: 'Epilasyon Uzmanı', services: ['3'] },
        ]
    },
    {
        id: '4',
        name: 'Dent Klinik',
        type: 'Diş & Sağlık',
        rating: 4.9,
        reviews: 256,
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80',
        description: 'Son teknoloji ekipmanlarla diş sağlığı hizmeti veren modern klinik.',
        services: [
            { id: '1', name: 'Diş Muayenesi', duration: '30 dk', price: 200 },
            { id: '2', name: 'Diş Temizleme', duration: '45 dk', price: 400 },
            { id: '3', name: 'Dolgu', duration: '60 dk', price: 500 },
        ],
        staff: [
            { id: '1', name: 'Dr. Ahmet Kaya', title: 'Diş Hekimi', services: ['1', '2', '3'] },
            { id: '2', name: 'Dr. Ayşe Yılmaz', title: 'Diş Hekimi', services: ['1', '2', '3'] },
        ]
    },
    {
        id: '5',
        name: 'Medica Plus',
        type: 'Diş & Sağlık',
        rating: 4.8,
        reviews: 198,
        image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        description: 'Genel sağlık ve diş hizmetleri sunan tam donanımlı klinik.',
        services: [
            { id: '1', name: 'Genel Muayene', duration: '30 dk', price: 300 },
            { id: '2', name: 'Check-up', duration: '120 dk', price: 1000 },
            { id: '3', name: 'Kan Tahlili', duration: '15 dk', price: 200 },
        ],
        staff: [
            { id: '1', name: 'Dr. Mehmet Demir', title: 'Dahiliye Uzmanı', services: ['1', '2'] },
            { id: '2', name: 'Dr. Zeynep Ak', title: 'Aile Hekimi', services: ['1', '3'] },
        ]
    },
    {
        id: '6',
        name: 'Fit Life',
        type: 'Spor & Fitness',
        rating: 4.6,
        reviews: 167,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Modern ekipmanlar ve uzman eğitmenlerle fitness hizmetleri.',
        services: [
            { id: '1', name: 'Personal Training', duration: '60 dk', price: 200 },
            { id: '2', name: 'Yoga Dersi', duration: '60 dk', price: 150 },
            { id: '3', name: 'Pilates Dersi', duration: '60 dk', price: 150 },
        ],
        staff: [
            { id: '1', name: 'Can Yılmaz', title: 'Fitness Eğitmeni', services: ['1'] },
            { id: '2', name: 'Seda Demir', title: 'Yoga & Pilates Eğitmeni', services: ['2', '3'] },
        ]
    },
    {
        id: '7',
        name: 'Power Gym',
        type: 'Spor & Fitness',
        rating: 4.7,
        reviews: 145,
        image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Profesyonel fitness merkezi ve grup dersleri.',
        services: [
            { id: '1', name: 'Fitness Programı', duration: '60 dk', price: 250 },
            { id: '2', name: 'CrossFit', duration: '45 dk', price: 200 },
            { id: '3', name: 'Beslenme Danışmanlığı', duration: '30 dk', price: 300 },
        ],
        staff: [
            { id: '1', name: 'Ali Kaya', title: 'CrossFit Eğitmeni', services: ['1', '2'] },
            { id: '2', name: 'Merve Şahin', title: 'Beslenme Uzmanı', services: ['3'] },
        ]
    },
    {
        id: '8',
        name: 'Pet Care',
        type: 'Veteriner',
        rating: 4.9,
        reviews: 203,
        image: 'https://images.unsplash.com/photo-1527082395-e939b847da0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Evcil hayvanlarınız için profesyonel veterinerlik hizmetleri.',
        services: [
            { id: '1', name: 'Genel Muayene', duration: '30 dk', price: 200 },
            { id: '2', name: 'Aşılama', duration: '15 dk', price: 150 },
            { id: '3', name: 'Tüy Kesimi', duration: '60 dk', price: 250 },
        ],
        staff: [
            { id: '1', name: 'Dr. Emre Yıldız', title: 'Veteriner Hekim', services: ['1', '2'] },
            { id: '2', name: 'Ayşe Kara', title: 'Pet Kuaförü', services: ['3'] },
        ]
    },
    {
        id: '9',
        name: 'Animal Health',
        type: 'Veteriner',
        rating: 4.8,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: '7/24 veteriner kliniği ve pet bakım merkezi.',
        services: [
            { id: '1', name: 'Acil Müdahale', duration: '60 dk', price: 500 },
            { id: '2', name: 'Ultrason', duration: '30 dk', price: 300 },
            { id: '3', name: 'Yatılı Bakım', duration: '1440 dk', price: 200 },
        ],
        staff: [
            { id: '1', name: 'Dr. Kemal Öz', title: 'Veteriner Hekim', services: ['1', '2'] },
            { id: '2', name: 'Dr. Selin Ak', title: 'Veteriner Hekim', services: ['1', '2'] },
        ]
    },
    {
        id: '10',
        name: 'Mind Wellness',
        type: 'Psikolog',
        rating: 4.9,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Uzman psikologlarla bireysel ve grup terapileri.',
        services: [
            { id: '1', name: 'Bireysel Terapi', duration: '50 dk', price: 500 },
            { id: '2', name: 'Çift Terapisi', duration: '80 dk', price: 700 },
            { id: '3', name: 'Grup Terapisi', duration: '90 dk', price: 300 },
        ],
        staff: [
            { id: '1', name: 'Dr. Deniz Yılmaz', title: 'Klinik Psikolog', services: ['1', '2'] },
            { id: '2', name: 'Dr. Berk Kaya', title: 'Psikoterapist', services: ['1', '3'] },
        ]
    },
    {
        id: '11',
        name: 'Psikoterapi Merkezi',
        type: 'Psikolog',
        rating: 4.8,
        reviews: 134,
        image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Profesyonel psikolojik danışmanlık hizmetleri.',
        services: [
            { id: '1', name: 'İlk Görüşme', duration: '60 dk', price: 400 },
            { id: '2', name: 'Online Terapi', duration: '45 dk', price: 350 },
            { id: '3', name: 'Aile Terapisi', duration: '90 dk', price: 800 },
        ],
        staff: [
            { id: '1', name: 'Dr. Aylin Demir', title: 'Uzman Psikolog', services: ['1', '2', '3'] },
            { id: '2', name: 'Dr. Canan Yıldız', title: 'Aile Terapisti', services: ['1', '3'] },
        ]
    },
    {
        id: '12',
        name: 'Fizyo Plus',
        type: 'Fizyoterapist',
        rating: 4.7,
        reviews: 167,
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Uzman fizyoterapistlerle rehabilitasyon hizmetleri.',
        services: [
            { id: '1', name: 'Fizik Tedavi', duration: '60 dk', price: 300 },
            { id: '2', name: 'Manuel Terapi', duration: '45 dk', price: 250 },
            { id: '3', name: 'Rehabilitasyon', duration: '60 dk', price: 350 },
        ],
        staff: [
            { id: '1', name: 'Mehmet Yılmaz', title: 'Fizyoterapist', services: ['1', '2'] },
            { id: '2', name: 'Ayşe Kara', title: 'Fizik Tedavi Uzmanı', services: ['1', '3'] },
        ]
    },
    {
        id: '13',
        name: 'Sağlıklı Hareket',
        type: 'Fizyoterapist',
        rating: 4.8,
        reviews: 145,
        image: 'https://images.unsplash.com/photo-1573497620241-c3dd3d6ea943?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Fizik tedavi ve rehabilitasyon merkezi.',
        services: [
            { id: '1', name: 'Spor Rehabilitasyonu', duration: '60 dk', price: 350 },
            { id: '2', name: 'Masaj Terapi', duration: '30 dk', price: 200 },
            { id: '3', name: 'Postür Analizi', duration: '45 dk', price: 250 },
        ],
        staff: [
            { id: '1', name: 'Ali Demir', title: 'Spor Fizyoterapisti', services: ['1', '3'] },
            { id: '2', name: 'Zeynep Ak', title: 'Masaj Terapisti', services: ['2'] },
        ]
    }
];

export default function BusinessesPage() {
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const filteredBusinesses = selectedCategory === 'Tümü'
        ? businesses
        : businesses.filter(business => business.type === selectedCategory);

    const handleBooking = (business: Business) => {
        setSelectedBusiness(business);
        setIsBookingModalOpen(true);
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        AppointX'i Kullanan İşletmeler
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Türkiye'nin önde gelen işletmeleri AppointX ile randevularını yönetiyor.
                    </p>
                </div>

                {/* Kategori Filtreleme */}
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                } transition-colors duration-200`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {filteredBusinesses.map((business) => (
                        <article
                            key={business.name}
                            className="flex flex-col items-start rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="w-full">
                                <img
                                    src={business.image}
                                    alt={business.name}
                                    className="h-48 w-full object-cover"
                                />
                            </div>
                            <div className="p-6 flex-1 w-full">
                                <div className="flex items-center gap-x-4 text-xs mb-2">
                                    <span className="text-gray-500">{business.type}</span>
                                    <span className="flex items-center text-yellow-500">
                                        <FaStar className="mr-1" />
                                        {business.rating} ({business.reviews} değerlendirme)
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                    {business.name}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {business.description}
                                </p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleBooking(business)}
                                        className="text-sm font-semibold leading-6 text-purple-600 hover:text-purple-500"
                                    >
                                        Randevu Al <span aria-hidden="true">→</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {selectedBusiness && (
                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    business={selectedBusiness}
                />
            )}
        </div>
    );
} 