"use client";
import React, { useEffect, useState } from 'react';

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('tr-TR');
}

const CATEGORIES = [
    'Kuaför & Güzellik',
    'Diş & Sağlık',
    'Spor & Fitness',
    'Veteriner',
    'Psikolog',
    'Fizyoterapist',
];

const BUSINESSES = [
    { id: '1', name: 'Elit Kuaför', category: 'Kuaför & Güzellik' },
    { id: '2', name: 'Style Studio', category: 'Kuaför & Güzellik' },
    { id: '3', name: 'Beauty Center', category: 'Kuaför & Güzellik' },
    { id: '4', name: 'Diş Hekimi Ağız Sağlığı', category: 'Diş & Sağlık' },
    { id: '5', name: 'FitLife Gym', category: 'Spor & Fitness' },
    { id: '6', name: 'VetPet Veteriner', category: 'Veteriner' },
    { id: '7', name: 'PsikoDestek', category: 'Psikolog' },
    { id: '8', name: 'Fizyoterapi Merkezi', category: 'Fizyoterapist' },
];

const SERVICES = [
    { id: '1', businessId: '1', name: 'Saç Kesimi', duration: 30, price: 150 },
    { id: '2', businessId: '1', name: 'Saç Boyama', duration: 120, price: 400 },
    { id: '3', businessId: '1', name: 'Fön', duration: 30, price: 100 },
    { id: '4', businessId: '2', name: 'Saç Kesimi', duration: 30, price: 180 },
    { id: '5', businessId: '2', name: 'Saç Boyama', duration: 120, price: 450 },
    { id: '6', businessId: '3', name: 'Cilt Bakımı', duration: 60, price: 300 },
    { id: '7', businessId: '5', name: 'Kişisel Antrenman', duration: 60, price: 200 },
    { id: '8', businessId: '4', name: 'Diş Temizliği', duration: 45, price: 350 },
];

const EMPLOYEES = [
    { id: '1', businessId: '1', name: 'Ahmet Yılmaz', title: 'Uzman Kuaför' },
    { id: '2', businessId: '1', name: 'Mehmet Demir', title: 'Stilist' },
    { id: '3', businessId: '2', name: 'Ayşe Kaya', title: 'Kuaför' },
    { id: '4', businessId: '3', name: 'Fatma Şahin', title: 'Cilt Uzmanı' },
    { id: '5', businessId: '5', name: 'Ali Veli', title: 'Antrenör' },
    { id: '6', businessId: '4', name: 'Dr. Zeynep Güneş', title: 'Diş Hekimi' },
];

// ConfirmModal bileşeni
function ConfirmModal({ open, onConfirm, onCancel }: { open: boolean, onConfirm: () => void, onCancel: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="text-lg font-semibold mb-4 text-gray-900">Bu randevuyu iptal etmek istediğinize emin misiniz?</div>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
                        onClick={onCancel}
                    >Hayır</button>
                    <button
                        className="px-4 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-600 transition"
                        onClick={onConfirm}
                    >Evet</button>
                </div>
            </div>
        </div>
    );
}

export default function CustomerDashboard() {
    // Statik müşteri bilgisi
    const customer = {
        id: '1',
        fullName: 'Ali Veli',
        email: 'ali@veli.com',
        phoneNumber: '0555 555 55 55'
    };

    // Statik aktif randevular
    const aktifRandevular = [
        {
            id: '1',
            date: '2025-04-26',
            time: '18:07',
            service: 'Saç Kesimi',
            businessName: 'Elit Kuaför',
            employeeName: 'Ahmet Yılmaz',
            status: 'Bekliyor',
        },
        {
            id: '2',
            date: '2025-04-27',
            time: '14:00',
            service: 'Saç Boyama',
            businessName: 'Style Studio',
            employeeName: 'Ayşe Kaya',
            status: 'Onaylandı',
        },
        {
            id: '3',
            date: '2025-04-28',
            time: '10:30',
            service: 'Cilt Bakımı',
            businessName: 'Beauty Center',
            employeeName: 'Fatma Şahin',
            status: 'Bekliyor',
        },
        {
            id: '4',
            date: '2025-04-29',
            time: '09:00',
            service: 'Diş Temizliği',
            businessName: 'Diş Hekimi Ağız Sağlığı',
            employeeName: 'Dr. Zeynep Güneş',
            status: 'Onaylandı',
        },
        {
            id: '5',
            date: '2025-04-30',
            time: '16:00',
            service: 'Kişisel Antrenman',
            businessName: 'FitLife Gym',
            employeeName: 'Ali Veli',
            status: 'Bekliyor',
        },
    ];

    // Statik geçmiş randevular
    const gecmisRandevular = [
        {
            id: '6',
            date: '2024-04-20',
            time: '11:00',
            service: 'Saç Kesimi',
            businessName: 'Elit Kuaför',
            employeeName: 'Ahmet Yılmaz',
            status: 'Tamamlandı',
        },
        {
            id: '7',
            date: '2024-03-15',
            time: '13:30',
            service: 'Saç Boyama',
            businessName: 'Style Studio',
            employeeName: 'Ayşe Kaya',
            status: 'İptal',
        },
        {
            id: '8',
            date: '2024-02-10',
            time: '15:00',
            service: 'Cilt Bakımı',
            businessName: 'Beauty Center',
            employeeName: 'Fatma Şahin',
            status: 'Tamamlandı',
        },
        {
            id: '9',
            date: '2024-01-05',
            time: '09:30',
            service: 'Diş Temizliği',
            businessName: 'Diş Hekimi Ağız Sağlığı',
            employeeName: 'Dr. Zeynep Güneş',
            status: 'Tamamlandı',
        },
        {
            id: '10',
            date: '2023-12-22',
            time: '17:00',
            service: 'Kişisel Antrenman',
            businessName: 'FitLife Gym',
            employeeName: 'Ali Veli',
            status: 'İptal',
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [creating, setCreating] = useState(false);
    const [aktifRandevularState, setAktifRandevularState] = useState(aktifRandevular);
    const [gecmisRandevularState, setGecmisRandevularState] = useState(gecmisRandevular);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingCancelIndex, setPendingCancelIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-10 px-4">
                <h1 className="text-2xl font-bold mb-6">Müşteri Paneli</h1>
                {customer && (
                    <div className="mb-6 p-4 bg-white rounded shadow text-black">
                        <div><b>Ad Soyad:</b> {customer.fullName}</div>
                        <div><b>E-posta:</b> {customer.email}</div>
                        <div><b>Telefon:</b> {customer.phoneNumber}</div>
                    </div>
                )}
                <div className="mb-8">
                    <button
                        className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700 transition"
                        onClick={() => { setShowModal(true); setStep(1); }}
                    >
                        Yeni Randevu Al
                    </button>
                </div>
                {/* Modal Başlangıcı */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                            <h2 className="text-xl font-bold mb-4">Randevu Oluştur</h2>
                            {step === 1 && (
                                <div>
                                    <div className="mb-4 font-medium">Kategori Seçin</div>
                                    <div className="flex flex-wrap gap-2">
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat}
                                                className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                                onClick={() => setSelectedCategory(cat)}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700 transition disabled:opacity-50"
                                            disabled={!selectedCategory}
                                            onClick={() => setStep(2)}
                                        >
                                            Devam Et
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div>
                                    <div className="mb-4 font-medium">İşletme Seçin</div>
                                    <div className="flex flex-wrap gap-2">
                                        {BUSINESSES.filter(b => b.category === selectedCategory).map(business => (
                                            <button
                                                key={business.id}
                                                className={`px-4 py-2 rounded-lg border ${selectedBusiness?.id === business.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                                onClick={() => setSelectedBusiness(business)}
                                            >
                                                {business.name}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-between">
                                        <button
                                            className="px-6 py-2 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setStep(1)}
                                        >
                                            Geri
                                        </button>
                                        <button
                                            className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700 transition disabled:opacity-50"
                                            disabled={!selectedBusiness}
                                            onClick={() => setStep(3)}
                                        >
                                            Devam Et
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div>
                                    <div className="mb-4 font-medium">Hizmet Seçin</div>
                                    <div className="flex flex-wrap gap-2">
                                        {SERVICES.filter(s => s.businessId === selectedBusiness?.id).map(service => (
                                            <button
                                                key={service.id}
                                                className={`px-4 py-2 rounded-lg border ${selectedService?.id === service.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                                onClick={() => setSelectedService(service)}
                                            >
                                                <div className="font-semibold">{service.name}</div>
                                                <div className="text-xs text-gray-500">{service.duration} dk • {service.price} TL</div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-between">
                                        <button
                                            className="px-6 py-2 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setStep(2)}
                                        >
                                            Geri
                                        </button>
                                        <button
                                            className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700 transition disabled:opacity-50"
                                            disabled={!selectedService}
                                            onClick={() => setStep(4)}
                                        >
                                            Devam Et
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 4 && (
                                <div>
                                    <div className="mb-4 font-medium">Personel Seçin</div>
                                    <div className="flex flex-wrap gap-2">
                                        {EMPLOYEES.filter(e => e.businessId === selectedBusiness?.id).map(employee => (
                                            <button
                                                key={employee.id}
                                                className={`px-4 py-2 rounded-lg border ${selectedEmployee?.id === employee.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                                onClick={() => setSelectedEmployee(employee)}
                                            >
                                                <div className="font-semibold">{employee.name}</div>
                                                <div className="text-xs text-gray-500">{employee.title}</div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-between">
                                        <button
                                            className="px-6 py-2 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setStep(3)}
                                        >
                                            Geri
                                        </button>
                                        <button
                                            className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700 transition disabled:opacity-50"
                                            disabled={!selectedEmployee}
                                            onClick={() => setStep(5)}
                                        >
                                            Devam Et
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 5 && (
                                <div>
                                    <div className="mb-4 font-medium">Tarih ve Saat Seçin</div>
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={e => setSelectedDate(e.target.value)}
                                            className="form-input border rounded px-3 py-2"
                                        />
                                        <input
                                            type="time"
                                            value={selectedTime}
                                            onChange={e => setSelectedTime(e.target.value)}
                                            className="form-input border rounded px-3 py-2"
                                        />
                                    </div>
                                    <div className="mb-4 p-3 bg-gray-50 rounded">
                                        <div className="mb-1 text-sm text-gray-600">Ad Soyad</div>
                                        <div className="font-medium">{customer?.fullName}</div>
                                        <div className="mb-1 mt-2 text-sm text-gray-600">Telefon</div>
                                        <div className="font-medium">{customer?.phoneNumber}</div>
                                    </div>
                                    <div className="mt-6 flex justify-between">
                                        <button
                                            className="px-6 py-2 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setStep(4)}
                                        >
                                            Geri
                                        </button>
                                        <button
                                            className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-700 transition disabled:opacity-50"
                                            disabled={!selectedDate || !selectedTime || creating}
                                            onClick={async () => {
                                                setCreating(true);
                                                // Randevu nesnesi oluştur
                                                const newAppointment = {
                                                    id: Date.now().toString(),
                                                    customerId: customer?.id,
                                                    customerName: customer?.fullName,
                                                    phoneNumber: customer?.phoneNumber,
                                                    businessId: selectedBusiness?.id,
                                                    businessName: selectedBusiness?.name,
                                                    service: selectedService?.name,
                                                    serviceId: selectedService?.id,
                                                    employeeId: selectedEmployee?.id,
                                                    employeeName: selectedEmployee?.name,
                                                    date: selectedDate,
                                                    time: selectedTime,
                                                    status: 'Bekliyor',
                                                };
                                                // localStorage'a kaydet
                                                const apptKey = `appointments_${customer?.id}`;
                                                const prev = JSON.parse(localStorage.getItem(apptKey) || '[]');
                                                const updated = [...prev, newAppointment];
                                                localStorage.setItem(apptKey, JSON.stringify(updated));
                                                setShowModal(false);
                                                setCreating(false);
                                                setStep(1);
                                                setSelectedCategory('');
                                                setSelectedBusiness(null);
                                                setSelectedService(null);
                                                setSelectedEmployee(null);
                                                setSelectedDate('');
                                                setSelectedTime('');
                                            }}
                                        >
                                            {creating ? 'Oluşturuluyor...' : 'Randevu Oluştur'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* Modal Sonu */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Aktif Randevular</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-xl shadow-lg border border-gray-200 table-fixed">
                            <thead>
                                <tr className="bg-gradient-to-r from-purple-100 to-purple-50">
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Tarih</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Saat</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Hizmet</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">İşletme</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Personel</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Durum</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base min-w-[110px]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {aktifRandevularState.map((a, i) => {
                                    // Randevu tarihi ve saatini birleştirip Date objesi oluştur
                                    const randevuTarihi = new Date(`${a.date}T${a.time}`);
                                    const now = new Date();
                                    const farkSaat = (randevuTarihi.getTime() - now.getTime()) / (1000 * 60 * 60);
                                    const iptalEdilebilir = farkSaat >= 2 && a.status !== 'İptal';
                                    return (
                                        <tr key={i} className={`border-b last:border-b-0 transition hover:bg-purple-50 ${i % 2 === 1 ? 'bg-gray-50' : ''}`}>
                                            <td className="p-3 text-gray-900">{formatDate(a.date)}</td>
                                            <td className="p-3 text-gray-900">{a.time}</td>
                                            <td className="p-3 text-gray-900">{a.service}</td>
                                            <td className="p-3 text-gray-900">{a.businessName || '-'}</td>
                                            <td className="p-3 text-gray-900">{a.employeeName || '-'}</td>
                                            <td className="p-3 text-gray-900">{a.status}</td>
                                            <td className="p-3 min-w-[110px] whitespace-nowrap">
                                                <button
                                                    className={`px-3 py-1 rounded bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50`}
                                                    disabled={!iptalEdilebilir}
                                                    title={iptalEdilebilir ? 'Randevuyu iptal et' : 'Randevuya 2 saatten az kaldı, iptal edilemez'}
                                                    onClick={() => {
                                                        setPendingCancelIndex(i);
                                                        setConfirmOpen(true);
                                                    }}
                                                >
                                                    İptal Et
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Geçmiş Randevular</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-xl shadow-lg border border-gray-200">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Tarih</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Saat</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Hizmet</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">İşletme</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Personel</th>
                                    <th className="p-3 text-left text-gray-900 font-bold text-base">Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gecmisRandevularState.map((a, i) => (
                                    <tr key={i} className={`border-b last:border-b-0 transition hover:bg-gray-100 ${i % 2 === 1 ? 'bg-gray-50' : ''}`}>
                                        <td className="p-3 text-gray-900">{formatDate(a.date)}</td>
                                        <td className="p-3 text-gray-900">{a.time}</td>
                                        <td className="p-3 text-gray-900">{a.service}</td>
                                        <td className="p-3 text-gray-900">{a.businessName || '-'}</td>
                                        <td className="p-3 text-gray-900">{a.employeeName || '-'}</td>
                                        <td className="p-3 text-gray-900">{a.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* ConfirmModal çağrısı */}
                <ConfirmModal
                    open={confirmOpen}
                    onCancel={() => { setConfirmOpen(false); setPendingCancelIndex(null); }}
                    onConfirm={() => {
                        if (pendingCancelIndex !== null) {
                            const a = aktifRandevularState[pendingCancelIndex];
                            const yeniAktif = aktifRandevularState.filter((_, idx) => idx !== pendingCancelIndex);
                            const iptalRandevu = { ...a, status: 'İptal' };
                            setAktifRandevularState(yeniAktif);
                            setGecmisRandevularState([iptalRandevu, ...gecmisRandevularState]);
                        }
                        setConfirmOpen(false);
                        setPendingCancelIndex(null);
                    }}
                />
            </div>
        </div>
    );
} 